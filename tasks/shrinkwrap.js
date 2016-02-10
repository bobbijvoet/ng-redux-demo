/**
 * Generates a new npm-shrinkwrap file, with all correct options.
 *
 * This uses Uber's npm-shrinkwrap, an improved version of npm's
 * shrinkwrap, see https://github.com/uber/npm-shrinkwrap.
 */
'use strict';

module.exports = function (gulp, $) {
    var _ = require('lodash');
    var gutil = $.util;
    var exec = require('child_process').exec;
    var cleanShrinkWrap = require('../tools/npm/clean-shrinkwrap').run;

    gulp.task('shrinkwrap', function(callback) {
        exec('npm shrinkwrap --dev', function(error, stdout, stderr) {
            process.stdout.write(stdout);
            process.stderr.write(stderr);

            if (error) {
                return callback(error);
            }

            cleanShrinkWrap(callback);
        });
    });

    /**
     * Check if the shrinkwrap file is up-to-date with package.json.
     */
    gulp.task('check-shrinkwrap', function(callback) {
        // check for packages defined as dependency in one but not in the other
        var packageConf = require('../package.json');
        var shrinkwrapConf = require('../npm-shrinkwrap.json');

        var packageDeps = _.union(_.keys(packageConf.dependencies), _.keys(packageConf.devDependencies));
        var shrinkwrapDeps = _.keys(shrinkwrapConf.dependencies);

        var notInShrinkwrap = _.difference(packageDeps, shrinkwrapDeps);
        if (notInShrinkwrap.length > 0) {
            return callback(new gutil.PluginError('check-shrinkwrap',
                'In package.json but not in npm-shrinkwrap.json: [' + notInShrinkwrap + ']. Please run `gulp shrinkwrap` to update npm-shrinkwrap.json.'));
        }
        var notInPackage = _.difference(shrinkwrapDeps, packageDeps);
        if (notInPackage.length > 0) {
            return callback(new gutil.PluginError('check-shrinkwrap',
                'In npm-shrinkwrap.json but not in package.json: [' + notInPackage + ']. Please run `gulp shrinkwrap` to update npm-shrinkwrap.json.'));
        }

        return callback();
    });
};

