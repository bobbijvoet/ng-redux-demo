var es = require('event-stream');
var packageName = require('../package').name;
var config = require('../config');
var path = require('path');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('config-files', ['clean'], function() {
        return gulp.src([ path.join(config.paths.config, '**/*') ])
            .pipe(gulp.dest(config.paths.output));
    });

    gulp.task('build', ['js-quality', 'js-bundle', 'templates', 'test', 'config-files'], function () {
        return es.merge(
            gulp.src('./app/' + packageName + '.html'),
            //Inject the dependencies into the index.html and move it to the destination folder
            gulp.src('./index.html')
                .pipe($.inject(gulp.src(['build/vendor/angular.min.js', 'build/vendor/angular-translate.min.js', 'build/vendor/angular-*.js', 'build/vendor/!(angular)*.js', 'build/js/*.js'], {
                    read: false
                }), { ignorePath: 'build', relative: true })))
            //Copy the app entrypoint html to the destination folder
            .pipe(gulp.dest(config.paths.output));
    });
};
