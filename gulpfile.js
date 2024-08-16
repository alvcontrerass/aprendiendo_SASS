//Version gulp 4.0.0 y Node con tipeado commonJS *funciona con dependencia gulp-plumber*
/*const { src, dest, watch } = require('gulp')
const sass = require("gulp-sass")(require('sass'))
const plumber = require('gulp-plumber')*/
//css = done => {
//    src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest("build/css"))
//    done()
//}

//dev = done => {
//    watch('src/scss/**/*.scss', css)
//    done()
//}

//exports.dev = dev;

//Version Gulp 5.0.0 y Node con tipeado Module
import {src, dest, watch, series, parallel} from 'gulp' //tambien puedes ocupar parallel, el cual arranca todas las tareas al mismo tiempo
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import {glob} from 'glob'

const sass = gulpSass(dartSass)

//para reducir tamano de js puedes minificarlo con gulp-terser y agregar un .pipe(terser()) antes de dest
export function js(done) {
    src('src/js/app.js').pipe(dest('build/js'))
    done()
}

//en function css puedes reducir el tamano del css minificandolo ocupando outputStyle: 'compressed' dentro de sass()
export function css(done) {
    src('src/scss/style.scss', {sourcemaps:true}).pipe(sass().on('error', sass.logError)).pipe(dest("build/css", {sourcemaps:'.'}))
    done()
}

//funcion de nodejs para poder redimensionar imagenes
export async function crop(done) {
    const inputFolder = 'src/img/grande'
    const outputFolder = 'src/img/reducido';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileavif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileavif)
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/*.js', js)
    watch('src/img/**/*.{jpg, png}', imagenes)
}

export default series(crop, js, css, imagenes, dev) //series ejecuta todas las tareas, pero en orden

