"use strict";

const angular = require('angular');
console.log('main.js');
// angular modules
require('./templates');
require('./core/core.module');
require('./example/example.module');

// create and bootstrap application
angular.element(document).ready(function() {

	const requires = [
		'templates', //gulp-angular-templatecache
		'app.core',
		'app.example'
	];

	// mount on window for testing
	window.app = angular.module('app', requires);


	angular.bootstrap(document, ['app']);

});
