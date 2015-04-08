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
	 				$scope.contentType = sharedProperties.getString();
	 				console.log($scope.contentType);
	 				return "views/" + $scope.contentType + ".html";
	 			};
	
	 			$scope.closeMenu = function() {
	 		    $mdSidenav('left').close();
	 		  };
	 		}
	 	};
	 });
})();
