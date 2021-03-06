'use strict';

var config = require('../config');
var packageName = require('../package').name;
var path = require('path');

module.exports = function (gulp, $) {

    gulp.task('templates', ['clean'], function () {
        //Bundle the project's templates to one single namespaced js file
        return gulp
            .src(config.sources.templates)
            .pipe($.minifyHtml({ empty: true }))
            .pipe($.angularTemplatecache(
                packageName + '.templates.js', {
                    //templateHeader : 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
                    //standalone: false,
                    module: packageName
                }
            ))
            .pipe(gulp.dest(path.join(config.paths.output, 'js')));
    });

};
