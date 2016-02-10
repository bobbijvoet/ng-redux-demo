var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('sass', function () {
        return gulp
            .src(config.sources.styles)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./styles/'));
    });

    gulp.task('sass:watch', function () {
        gulp.watch(config.sources.styles, ['sass']);
    });    
};

