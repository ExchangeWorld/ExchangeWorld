'use strict';

module.exports = {

	'browserPort'  : 3000,
	'UIPort'       : 3001,
	'serverPort'   : 3002,

	'styles': {
		'src' : 'app/styles/**/*.scss',
		'dest': 'build/css'
	},

	'scripts': {
		'src' : 'app/angular/**/*.js',
		'dest': 'build/js'
	},

	'images': {
		'src' : 'app/images/**/*',
		'dest': 'build/images'
	},

	'fonts': {
		'src' : ['app/fonts/**/*'],
		'dest': 'build/fonts'
	},

	'data': {
		'src' : ['app/data/*'],
		'dest': 'build/data'
	},

	'views': {
		'watch': [
			'app/index.html',
			'app/xmas-share.html',
			'app/angular/**/*.html'
		],
		'src': 'app/angular/**/*.html',
		'dest': 'app/angular'
	},

	'gzip': {
		'src': 'build/**/*.{html,xml,json,css,js,js.map}',
		'dest': 'build/',
		'options': {}
	},

	'dist': {
		'root' : 'build'
	},

	'browserify': {
		'entries'   : ['./app/angular/main.js'],
		'bundleName': 'main.js',
		'sourcemap' : true
	},

	'test': {
		'karma': 'test/karma.conf.js',
		'protractor': 'test/protractor.conf.js'
	}

};
