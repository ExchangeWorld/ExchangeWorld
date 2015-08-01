"use strict";

angular
	.module('ExwdApp', [
		'ngMaterial',
		'ui.bootstrap',
		'ngRoute',
		'facebook',

		'NavbarController',
		'mapController',
		'SeekController',
		'GoodsController',
		'ProfileController',

		'listenerDirective',
		'templateUrlDircetive',
		'commonServices'
	])
	.config(themeprovider)
	.config(routeprovider) //['$routeProvider', '$locationProvider',
	.config(facebookprovider)
	.controller('FacebookController', fbctrl);//'fbCtrl', ['$scope',

function themeprovider($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('teal', {
			'default': '600', // by default use shade 600 from the teal palette for primary intentions
			'hue-1': '400', // use shade 400 for the <code>md-hue-1</code> class
			'hue-2': '900', // use shade 900 for the <code>md-hue-2</code> class
			'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
		})
		// If you specify less than all of the keys, it will inherit from the
		// default shades
		.accentPalette('amber', {
			'default': '700'
		});
}

function routeprovider($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/index.html',
	}).
	when('/seek', {
		templateUrl: 'views/seek.html',
		controller: 'SeekCtrl',
		controllerAs: 'vm'
	}).
	when('/seek/:gid', {
		templateUrl: 'views/goods.html',
		controller: 'GoodsCtrl',
		controllerAs: 'vm'
	}).
	when('/post', {
		templateUrl: 'views/post.html'
	}).
	when('/manage', {
		templateUrl: 'views/manage.html'
	}).
	when('/profile/:fb_id', {
		templateUrl: 'views/profile.html',
		controller: 'ProfileCtrl',
		controllerAs: 'vm'
	}).
	otherwise({
		redirectTo: '/seek'
	});

	//		$locationProvider.html5Mode({
	//		  enabled: true,
	//		  requireBase: false
	//		});
}


function facebookprovider(FacebookProvider) {
	// Set your appId through the setAppId method or use the shortcut in the initialize method directly.
	FacebookProvider.init('398517123645939'); // exwd Dev_appID
}

function fbctrl($scope, $timeout, Facebook) {
	var vm         = this;
	vm.user        = {}; // Define user empty data :/
	vm.logged      = false; // Defining user logged status
	vm.IntentLogin = intentlogin;
	vm.login       = login;
	vm.me          = me;
	vm.logout      = logout;

	/**
	 * Watch for Facebook to be ready.
	 * There's also the event that could be used
	 */
	$scope.$watch(
		function() {
			return Facebook.isReady();
		},
		function(newVal) {
			if (newVal)
				vm.facebookReady = true;
		}
	);

	Facebook.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			vm.logged = true;
		}
	});

	/**
	 * IntentLogin, check if is loggin.
	 * if already loggin, do nothings.
	 */
	function intentlogin() {
		if (!vm.logged) {
			vm.login();
			vm.me();
		}
	}

	/**
	 * Login
	 */
	function login() {
		Facebook.login(function(response) {
			if (response.status == 'connected') {
				vm.logged = true;
				vm.me();
			}
		});
	}

	/**
	 * me
	 * get user's facebook basic infomations 
	 */
	function me() {
		Facebook.api('/me', function(response) {
			/** Using vm.$apply since this happens outside angular framework.  */
			vm.$apply(function() {
				vm.user = response;
			});
			console.log(response);
		});
	}

	/**
	 * Logout
	 */
	function logout() {
		Facebook.logout(function() {
			vm.$apply(function() {
				vm.user = {};
				vm.logged = false;
			});
		});
	}

	/**
	 * Taking approach of Events :D
	$scope.$on('Facebook:statusChange', function(ev, data) {
		console.log('Status: ', data);
		if (data.status == 'connected') {
			$scope.$apply(function() {
				$scope.salutation = true;
				$scope.byebye = false;
			});
		} else {
			$scope.$apply(function() {
				$scope.salutation = false;
				$scope.byebye = true;

				// Dismiss byebye message after two seconds
				$timeout(function() {
					$scope.byebye = false;
				}, 2000);
			});
		}
	});
	 */
}
