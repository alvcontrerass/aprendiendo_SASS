const { src, dest, watch } = require('gulp')
const sass = require("gulp-sass")(require('sass'))
const plumber = require('gulp-plumber')

css = cb => {
    src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest("build/css"))
    cb()
}

dev = cb => {
    watch('src/scss/**/*.scss', css)
    cb()
}

exports.dev = dev;