const gulp        = require('gulp');
const sass = require('gulp-sass');
    sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');

module.exports = function styles() {
    return gulp.src('./dev/styles/*.scss')
        .pipe(sass().on('error', sass.logError))

        // Сорсмапы добавляли к весу файла довольно много
        // Инит сорсмапов перед взаимодействием с кодом

        // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
                cascade: false
            }))
        .pipe(shorthand())
        .pipe(cleanCSS())
        // .pipe(sourcemaps.write())

        .pipe(gulp.dest('./build/static/css'));
}

// gulp.task('sass:watch', function () {
//   gulp.watch('./dev/static/sass/**/*.scss', ['sass']);
// });