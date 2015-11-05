'use strict';

var config = require('./gulp.config')();
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gulp   = require('gulp');

gulp.task('test', function() {
    console.log('Inspecting code with JSHint and JSCS');

    return gulp
        .src(config.jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs())
        .pipe(jscs.reporter());
});
