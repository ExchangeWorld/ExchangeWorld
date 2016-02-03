'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var templateCache = require('gulp-angular-templatecache');

// Static files task
gulp.task('data', function() {
	// Process any other static files from app/data
	return gulp.src(config.data.src)
		.pipe(gulp.dest(config.data.dest));

});
