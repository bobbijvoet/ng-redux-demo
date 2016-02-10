/**
 * Git hook to make sure we check some basic things before pushing to a remote.
 * 
 * To install, just run `gulp install-git-hooks`
 */
module.exports = function (gulp, $) {
    'use strict';
    
    var fs = require('fs');

    // run these tasks and make sure they don't return errors to push
    gulp.task('pre-push', ['check-shrinkwrap', 'js-quality', 'test:local']);
    
    gulp.task('install-git-hooks', function(callback) {
        // This is a bit ugly but it works.
        // Possible improvements:
        // * Use the gulp in node_modules/.bin (instead of global)
        // * Use guppy pre-push instead: https://github.com/therealklanni/guppy-pre-push
        //   - the issue is that on VSO we are not running in a git repo and this breaks npm install
        fs.writeFile('.git/hooks/pre-push', '#!/bin/sh\ngulp pre-push', callback);
    });
};
