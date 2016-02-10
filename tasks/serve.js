var browserSync = require('browser-sync');
var bs = require("browser-sync").create();
var packageName = require('../package').name;
var wiredep = require('wiredep');
var config = require('../config');
var runSequence = require('run-sequence');

module.exports = function (gulp, $) {

    gulp.task('serve-mocked', function (cb) {
        //Run mock task before serve task
        runSequence('mock', 'serve', cb)
    });

    gulp.task('serve', ['sass:watch'], function () {
        //Get index.html or index-mocked if mock task runned before
        gulp.src(global.mock ? 'index-mocked.html' : 'index.html')
            //Inject dependencies
            .pipe($.inject(gulp.src(wiredep({devDependencies: true}).js, {
                read: false
            }), {name: 'deps', relative: true}))
            //Inject application scripts
            .pipe($.inject(gulp.src(config.sources.scripts, {
                read: false
            }), {relative: true}))
            //Only rename when index is not mocked
            .pipe($.if(!global.mock, $.rename('index-served.html')))
            .pipe(gulp.dest('./'));

        //Serve the app using browsersync. Basedirs are ./app and ./
        bs.init({
            logConnections: true,
            logFileChanges: true,
            open: !global.e2e,
            port: global.e2e ? 3333 : 3000,
            server: {
                baseDir: ['./app', './'],
                //Mocked or not
                index: global.mock ? 'index-mocked.html' : 'index-served.html'
            }
        });

        //Don't watch when e2e test runs
        if (global.e2e) {
            bs.pause();
        }

        //Watch all the project's files
        gulp.watch(config.paths.app + '/**/*.*').on('change', bs.reload);
    });
};
