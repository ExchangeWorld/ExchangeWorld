"use strict";

const angular = require('angular');

// angular modules
require('./templates');
require('./core/core.module');
require('./example/example.module');
require('./map/map.module');

// create and bootstrap application
angular.element(document).ready(function() {

	const requires = [
		'templates', //gulp-angular-templatecache
		'app.core',
		'app.example',
	    'app.map',
	];

	// mount on window for testing
	window.app = angular.module('app', requires);
	angular.bootstrap(document, ['app']);

});
