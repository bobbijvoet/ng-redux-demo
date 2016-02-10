module.exports = function (gulp, $) {
    'use strict';

    var reporters = require('jasmine-reporters');

    gulp.task('test-deployment', function() {
        return gulp.src('test/deployment/**/*.js')
            .pipe($.jasmine({
                verbose: true,
                reporter: [
                    new reporters.JUnitXmlReporter({
                        savePath: 'target/test-reports',
                        filePrefix: 'deployment-test-results'
                    }),
                    new reporters.TerminalReporter({
                        verbosity: 3
                    })
                ]
            }));
    });
};
