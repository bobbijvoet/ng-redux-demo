var path = require('path');
var child_process = require('child_process');
var runSequence = require('run-sequence');


module.exports = function (gulp, $) {
    'use strict';

    //Serve and run protractor
    gulp.task('test-e2e', function (cb) {
        //Run mock task before serve task
        global.e2e = true;
        runSequence('serve-mocked', 'protractor', cb)
    });

    //Run protractor
    gulp.task('protractor', function (done) {
        child_process.spawn('node_modules/.bin/protractor', ['protractor.conf.js'], {
            stdio: 'inherit'
        }).once('close', done);
    });
};
