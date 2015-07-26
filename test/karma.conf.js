'use strict';

var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');

module.exports = function(config) {

	config.set({

		basePath: '../',
		frameworks: ['jasmine', 'browserify'],
		preprocessors: {
			'app/angular/**/*.js': ['browserify', 'babel', 'coverage']
		},
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		autoWatch: true,

		browserify: {
			debug: true,
			transform: [
				'bulkify',
				istanbul({
					instrumenter: isparta,
					ignore: ['**/node_modules/**', '**/test/**']
				})
			]
		},

		proxies: {
			'/': 'http://localhost:9876/'
		},

		urlRoot: '/__karma__/',

		files: [
			// 3rd-party resources
			'node_modules/angular/angular.min.js',
			'node_modules/angular-mocks/angular-mocks.js',

			// app-specific code
			'app/angular/main.js',

			// test files
			'app/angular/**/*.spec.js'
		]

	});

};
