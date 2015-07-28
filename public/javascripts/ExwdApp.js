(function() {

	var ExwdApp = angular.module('ExwdApp', ['ngMaterial', 'ui.bootstrap', 'ngRoute', 'facebook',
		'navbarController', 'mapController', 'seekController', 'goodsController', 'profileController',
		'listenerDirective', 'templateUrlDircetive',
		'commonServices'
	]);

	ExwdApp.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal', {
				'default' : '600', // by default use shade 600 from the teal palette for primary intentions
				'hue-1'   : '400', // use shade 400 for the <code>md-hue-1</code> class
				'hue-2'   : '900', // use shade 900 for the <code>md-hue-2</code> class
				'hue-3'   : 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			// If you specify less than all of the keys, it will inherit from the
			// default shades
			.accentPalette('amber', {
				'default': '700'
			});
	});

	ExwdApp.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.
			when('/', {
				templateUrl: 'views/index.html',
			}).
			when('/seek', {
				templateUrl: 'views/seek.html',
				controller: 'seekCtrl'
			}).
			when('/seek/:gid', {
				templateUrl: 'views/goods.html',
				controller: 'goodsCtrl'
			}).
			when('/post', {
				templateUrl: 'views/post.html'
			}).
			when('/manage', {
				templateUrl: 'views/manage.html'
			}).
			when('/profile/:fb_id', {
				templateUrl: 'views/profile.html',
				controller: 'profileCtrl'
			}).
			otherwise({
				redirectTo: '/seek'
			});

			//		$locationProvider.html5Mode({
			//		  enabled: true,
			//		  requireBase: false
			//		});
		}
	]);


	ExwdApp.config(function(FacebookProvider) {
		// Set your appId through the setAppId method or
		// use the shortcut in the initialize method directly.
		FacebookProvider.init('398517123645939');
	});

	ExwdApp.controller('fbCtrl',
		['$scope',
		'$timeout',
		'Facebook',
		function($scope, $timeout, Facebook) {

			// Define user empty data :/
			$scope.user = {};

			// Defining user logged status
			$scope.logged = false;

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
						$scope.facebookReady = true;
				}
			);

			Facebook.getLoginStatus(function(response) {
				if (response.status == 'connected') {
					$scope.logged = true;
				}
			});

			/**
			 * IntentLogin, check if is loggin.
			 * if already loggin, do nothings.
			 */
			$scope.IntentLogin = function() {
				if (!$scope.logged) {
					$scope.login();
					$scope.me();
				}
			};

			/**
			 * Login
			 */
			$scope.login = function() {
				Facebook.login(function(response) {
					if (response.status == 'connected') {
						$scope.logged = true;
						$scope.me();
					}
				});
			};

			/**
			 * me
			 * get user's facebook basic infomations 
			 */
			$scope.me = function() {
				Facebook.api('/me', function(response) {
					/** Using $scope.$apply since this happens outside angular framework.  */
					$scope.$apply(function() {
						$scope.user = response;
					});
					console.log(response);
				});
			};

			/**
			 * Logout
			 */
			$scope.logout = function() {
				Facebook.logout(function() {
					$scope.$apply(function() {
						$scope.user = {};
						$scope.logged = false;
					});
				});
			};

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
]);

})();
