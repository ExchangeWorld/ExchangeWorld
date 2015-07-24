(function() {

    var ExwdApp = angular.module('ExwdApp', ['ngMaterial', 'ui.bootstrap', 'ngRoute', 'angularFblogin',
        'navbarController', 'mapController', 'seekController', 'goodsController',
        'listenerDirective', 'templateUrlDircetive',
        'commonServices'
    ]);

    ExwdApp.config(function($mdThemingProvider) {
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
            when('/profile', {
                templateUrl: 'views/profile.html'
            }).
            otherwise({
                redirectTo: '/seek'
            });

            //        $locationProvider.html5Mode({
            //          enabled: true,
            //          requireBase: false
            //        });
        }
    ]);

    ExwdApp.controller('appCtrl', function($scope, $fblogin) {
        $scope.login = function() {
            $fblogin({
                fbId: '398517123645939',
                permissions: 'email',
                fields: 'first_name, last_name, email',
                success: function(data) {
                    console.log('User birthday' + data.birthday + 'and email ' + data.email);
                },
                error: function(error) {
                    console.log('An error occurred.', error);
                }
            })
//.then(
                //onSuccess,
                //onError,
                //onProgress
            //);
        };
    });
    // Facebook SDK initialization
    //ExwdApp.run(['$rootScope', '$window', 'srvAuth',
    //function($rootScope, $window, sAuth) {
    //$rootScope.user = {};
    //$window.fbAsyncInit = function() {
    //// Executed when the SDK is loaded
    //FB.init({
    //appId: '398517123645939', // fb appId

    //[> 
    //Adding a Channel File improves the performance 
    //of the javascript SDK, by addressing issues 
    //with cross-domain communication in certain browsers. 
    //*/
    //channelUrl: '../channel.html',

    //[> 
    //Set if you want to check the authentication status
    //at the start up of the app 
    //*/
    //status: true,

    //[> 
    //Enable cookies to allow the server to access 
    //the session 
    //*/
    //cookie: true,
    //[> Parse XFBML <]
    //xfbml: true
    //});
    //sAuth.watchAuthenticationStatusChange();
    //};

    //// Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?
    //(function(d) {
    //// load the Facebook javascript SDK
    //var js,
    //id = 'facebook-jssdk',
    //ref = d.getElementsByTagName('script')[0];

    //if (d.getElementById(id)) {
    //return;
    //}

    //js = d.createElement('script');
    //js.id = id;
    //js.async = true;
    //js.src = "//connect.facebook.net/en_US/all.js";
    //ref.parentNode.insertBefore(js, ref);
    //}(document));
    //}
    //]);
})();
