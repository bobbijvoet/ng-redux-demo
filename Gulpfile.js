var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./config');

var taskPath = './tasks/';
var taskList = require('fs').readdirSync(taskPath).filter(function(fileName) {
    return fileName.match(/\.js$/);
});

//Get all tasks from /tasks folder
taskList.forEach(function (taskFile) {
    require(taskPath + taskFile)(gulp, $);
});

gulp.task('default', ['build']);
