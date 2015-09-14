'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var karma = require('karma');
var config = require('../config');
var karmaParseConfig = require('karma/lib/config').parseConfig;

function runKarma(configFilePath, options, cb) {
	configFilePath = path.resolve(configFilePath);

	var server = karma.server;
	var log = gutil.log;
	var colors = gutil.colors;
	var config = karmaParseConfig(configFilePath, {});

	Object.keys(options).forEach(function(key) {
		config[key] = options[key];
	});

	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}

gulp.task('unit', ['views'], function(cb) {
	runKarma(config.test.karma, {
		// autoWatch: true,
		singleRun: true
	}, cb);
});
