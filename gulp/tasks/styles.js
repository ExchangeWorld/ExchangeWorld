'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var streamqueue  = require('streamqueue');
var concat       = require('gulp-concat');

gulp.task('styles', function () {

	return streamqueue({ objectMode: true },
		gulp.src(
			[
				'node_modules/angular-material/'+ (global.isProd ? 'angular-material.min.css' : 'angular-material.css'),
				'node_modules/angular-toastr/dist/'+ (global.isProd ? 'angular-toastr.min.css' : 'angular-toastr.css'),
			]),
			gulp.src(config.styles.src)
				.pipe(sass({
					sourceComments: global.isProd ? 'none' : 'map',
					sourceMap: 'sass',
					outputStyle: global.isProd ? 'compressed' : 'nested',
				}))
				.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
		)
		.pipe(concat('main.css'))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.styles.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
