(function ()
{
	var templateUrlDircetive = angular.module('templateUrlDircetive', ['ngScrollable']);

	templateUrlDircetive.directive('navbar', function ()
	{
		return {
			restrict: 'E',
			templateUrl: "views/navbar.html"
		};
	});

	templateUrlDircetive.directive('sidenav', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'views/sidenav.html',
			controller: function ($scope, sharedProperties, $mdSidenav)
			{
				$scope.template = function ()
				{
					return "views/" + sharedProperties.getString() + ".html";
				};

				$scope.openLeftMenu = function() {
			    $mdSidenav('left').toggle();
			  };
			}
		};
	});
})();
