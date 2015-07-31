"use strict";

angular
	.module('templateUrlDircetive', ['ngScrollable'])
	.directive('sidenav', sidenav);

function sidenav() {
	return {
		restrict: 'E',
		templateUrl: 'views/sidenav.html',
		controller: ['$scope', 'sharedProperties', '$mdSidenav', function($scope, sharedProperties, $mdSidenav) {

			$scope.contentType = sharedProperties.getString();
			$scope.$on('sidenavChanged', function(event, message) {
				$scope.contentType = message;
			});

			$scope.closeMenu = function() {
				$mdSidenav('left').close();
			};
		}]
	};
}
