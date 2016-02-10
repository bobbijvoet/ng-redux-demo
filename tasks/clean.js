module.exports = function (gulp, $) {
    'use strict';

    var del = require('del');
    var config = require('../config');

    gulp.task('clean', function () {
        return del([config.paths.output, 'index-*', config.paths.dist, config.paths.temp, 'target']);
    })
};
