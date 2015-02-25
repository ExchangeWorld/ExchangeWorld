(function ()
{
	var templateUrlDircetive = angular.module('templateUrlDircetive', []);

	templateUrlDircetive.directive('navbar', function ()
	{
		return {
			restrict: 'E',
			templateUrl: "views/navbar.html"
		};
	});
})();
