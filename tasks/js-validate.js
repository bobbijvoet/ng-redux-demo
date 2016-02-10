var config = require('../config');
var fs = require('fs');
var ngDeps = require('ng-dependencies');
var packageName = require('../package').name;
var through = require('through');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('js-validate', ['clean'], function () {

        //Check if app module matches package name (set in config.json))
        try {
            var deps = ngDeps(fs.readFileSync(config.paths.app + '/' + packageName + '.module.js'));
        } catch (err) {
            throw new Error('app/' + packageName + '.module.js does not exist.');
        }
        if ((Object.keys(deps.modules)[0] !== packageName)) {
            throw new Error('The app module in: ' + config.paths.app + '/' + packageName + '.module.js does not match the package name.');
        }

        //Don't allow focused and excluded tests
        return gulp.src('**/*.spec.js')
            .pipe(notContains(['fdescribe', 'xdescribe', 'fit', 'xit']));

    })
};

//Borrowed from https://github.com/driftyco/ionic/blob/master/gulpfile.js
function notContains(disallowed) {
    disallowed = disallowed || [];

    return through(function (file) {
        var error;
        var contents = file.contents.toString();
        disallowed.forEach(function (str) {
            var idx = disallowedIndex(contents, str);
            if (idx !== -1) {
                error = error || file.path + ' contains ' + str + ' on line ' +
                    contents.substring(0, idx, str).split('\n').length + '!';
            }
        });
        if (error) {
            throw new Error('Your test at: ' + error);
        } else {
            this.emit('data', file);
        }
    });

    function disallowedIndex(content, disallowedString) {
        var notFunctionName = '[^A-Za-z0-9$_]';
        var regex = new RegExp('(^|' + notFunctionName + ')(' + disallowedString + ')' + notFunctionName + '*\\(', 'gm');
        var match = regex.exec(content);
        // Return the match accounting for the first submatch length.
        return match !== null ? match.index + match[1].length : -1;
    }
}

