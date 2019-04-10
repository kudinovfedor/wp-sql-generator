'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

gulp.task('babel', () => {
    return gulp.src('js/es6/*.js')
        .pipe(babel())
        .pipe(uglify({
            mangle: false,
            compress: false,
            output: {
                beautify: true,
                quote_style: 3,
            },
        }))
        .pipe(gulp.dest('js'));
});

gulp.task('js', () => {
    return gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(uglify({
            mangle: true,
            compress: true,
            output: {
                quote_style: 3,
            },
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js'));
});

gulp.task('watch', () => {
    gulp.watch('js/es6/*.js', gulp.series('babel'));
    gulp.watch('js/common.js', gulp.series('js'));
});

gulp.task('default', gulp.series('babel', 'js'));
