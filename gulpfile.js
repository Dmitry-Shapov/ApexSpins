const gulp = require('gulp');
const sass  = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');
// const gulp = requrite('gulp');

gulp.task('sass-compile', function(){
    return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(gulp.dest('./css/ '))
    .pipe(gulp.dest('css'));
})

gulp.task('watch',function(){
    gulp.watch('./scss/**/*.scss',gulp.series('sass-compile'));
})











