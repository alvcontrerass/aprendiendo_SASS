//Version gulp 4.0.0 y Node con tipeado commonJS
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
import {src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css(done) {
    src('src/scss/**/*.scss').pipe(sass()).pipe(dest("build/css"))
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
}

