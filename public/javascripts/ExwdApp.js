(function ()
{
	var ExwdApp = angular.module('ExwdApp', ['ngMaterial', 'ui.bootstrap', 'ngRoute', 'navbarController','mapController',
		'seekController','listenerDirective', 'templateUrlDircetive', 'commonServices'
	]);

	ExwdApp.config(function ($mdThemingProvider)
	{
		$mdThemingProvider.theme('default')
			.primaryPalette('teal',
			{
				'default': '600', // by default use shade 600 from the teal palette for primary intentions
				'hue-1': '400', // use shade 400 for the <code>md-hue-1</code> class
				'hue-2': '900', // use shade 900 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			// If you specify less than all of the keys, it will inherit from the
			// default shades
			.accentPalette('amber',
			{
				'default': '700'
			});
	});

	 ExwdApp.config(['$routeProvider','$locationProvider',
	   function ($routeProvider,$locationProvider)
	   {
	     $routeProvider.
         when('/',
         {
            templateUrl: 'views/index.html',
         }).
	     when('/seek',
	     {
	       templateUrl: 'views/seek.html',
           controller: 'seekCtrl'
	     }).
	     when('/seek/:gid',
	     {
	       templateUrl: 'views/good.html'
	     }).
	 	 when('/post',
	 	 {
            templateUrl: 'views/post.html'
	 	 }).
         when('/profile',
         {
	 		templateUrl: 'views/profile.html'
         }).
	     otherwise(
	     {
	       redirectTo: '/seek'
	     });
        
//        $locationProvider.html5Mode({
//          enabled: true,
//          requireBase: false
//        });
	   }
	 ]);

})();
