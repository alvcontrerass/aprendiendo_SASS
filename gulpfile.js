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

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/*.js', js)
}

export default series(js, css, dev) //series ejecuta todas las tareas, pero en orden

