'use strict';

var gulp   = require('gulp');
var config = require('../config');
var Server = require('karma').Server;

gulp.task('unit', ['views'], function() {

	return new Server({
		configFile: __dirname + '/../..' + config.test.karma,
    singleRun: true,
	}, function(err, success) {
		throw err;
	}).start();

});
