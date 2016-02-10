'use strict';

module.exports = function(config) {
    // on a CI server we use some additional features
    var _ = require('lodash');

    // apply the shared config first
    var mainConf = require('./karma.conf');
    mainConf(config);

    // these are extra settings we use for the CI build
    var extraConfig = {
        reporters: ['junit', 'coverage'],

        // don't use colors as they don't work on VSO
        colors: false,

        preprocessors: {
            'app/**/*.js': ['coverage']
        },

        junitReporter: {
            outputDir: 'target/test-reports',
            outputFile: 'unit-test-results.xml'
        },

        coverageReporter: {
            dir: 'target/coverage',
            reporters: [{
                type: 'clover',
                subdir: '.',
                file: 'clover.xml'
            }, {
                type: 'html',
                subdir: 'html'
            }]
        },

        singleRun: true
    };

    var merged = _.merge(config, extraConfig, function(a, b) {
        if (_.isArray(a)) {
            // append to arrays instead of replacing a with b
            return a.concat(b);
        }
    });

    config.set(merged);
};
