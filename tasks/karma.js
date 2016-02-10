module.exports = function (gulp, $) {
    'use strict';

    var karma = require('karma').server;
    var path = require('path');

    function runKarma(configFile, done) {
        karma.start({
            // make the path absolute or Karma will not find it (on Windows)
            configFile: path.resolve(configFile)
        }, done);
    }

    function runKarmaLocal(done) {
        runKarma('test/karma.conf.js', done);
    }

    function runKarmaDev(done) {
        runKarma('test/karma.dev.conf.js', done);
    }

    function runKarmaCI(done) {
        runKarma('test/karma.ci.conf.js', done);
    }

    gulp.task('test', ['clean'], function(done) {
        if (process.env.CI) {
            runKarmaCI(done);
        } else {
            runKarmaLocal(done);
        }
    });

    gulp.task('test:ci', ['clean'], function(done) {
        runKarmaCI(done);
    });

    gulp.task('test:local', ['clean'], function(done) {
        runKarmaLocal(done);
    });

    gulp.task('test:dev', ['clean'], function(done) {
        runKarmaDev(done);
    });
};
