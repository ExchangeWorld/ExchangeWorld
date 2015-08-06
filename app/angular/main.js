"use strict";

const angular = require('angular');

// angular modules
require('./templates');
require('./core/core.module');
//require('./example/example.module');
require('./map/map.module');
require('./profile/profile.module');
require('./post/post.module');
require('./goods/goods.module');
require('./seek/seek.module');
require('./layout/layout.module');

// create and bootstrap application
angular.element(document).ready(function() {

	const requires = [
		'templates', //gulp-angular-templatecache
		'app.core',
		//'app.example',
		'app.map',
		'app.goods',
		'app.post',
		'app.seek',
		'app.profile',
		'app.layout'
	];

	// mount on window for testing
	window.app = angular.module('app', requires);
	angular.bootstrap(document, ['app']);

});
