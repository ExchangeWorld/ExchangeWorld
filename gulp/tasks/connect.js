'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
var config  = require('../config');


gulp.task('connect', function() {
	connect.server({
		root: 'build',
		fallback: 'build/index.html',
		port: config.serverPort
	});
});
