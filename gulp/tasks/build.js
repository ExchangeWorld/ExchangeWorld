'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['clean'], function(cb) {

	cb = cb || function() {};

	global.isProd = true;

	runSequence(['styles', 'images', 'fonts', 'views', 'data', 'browserify'], 'zlib', cb);

});
