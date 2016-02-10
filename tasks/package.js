module.exports = function (gulp, $) {
  'use strict';
  
  var config = require('../config');
  var pkg = require('../package.json');
  
  var ZIP_NAME = pkg.name + '-' + pkg.version + '.zip';

  gulp.task('zip', ['build'], function () {
    return gulp.src([
      config.paths.output + '/**/*'
    ], { dot: true })
      .pipe($.zip(ZIP_NAME))
      .pipe(gulp.dest(config.paths.dist));
  });
 };
