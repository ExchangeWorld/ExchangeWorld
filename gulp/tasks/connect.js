'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
var config  = require('../config');


gulp.task('connect', function() {
	connect.server({
		root: 'build',
		//livereload: true,
		port: config.serverPort
	});
});
