"use strict";

const angular = require('angular');

// angular modules
require('./templates');
require('./core/core.module');
require('./layout/layout.module');
require('./home/home.module');
require('./map/map.module');
require('./profile/profile.module');
require('./follow/follow.module');
require('./exchange/exchange.module');
require('./post/post.module');
require('./goods/goods.module');
require('./seek/seek.module');
require('./login/login.module');
// require('./xmas/xmas.module');

// create and bootstrap application
angular.element(document).ready(function() {

	const requires = [
		'templates', //angular-templatecache
		'app.core',
		'app.layout',
		'app.home',
		'app.map',
		'app.goods',
		'app.post',
		'app.seek',
		'app.profile',
		'app.follow',
		'app.exchange',
		'app.login',
		// 'app.xmas',
	];

	// mount on window for testing
	window.app = angular.module('app', requires);
	angular.bootstrap(document, ['app']);

});
