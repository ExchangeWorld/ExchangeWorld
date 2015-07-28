(function() {
	var profileController = angular.module('profileController', ['profileServices']);

	profileController.controller('profileCtrl', ['$scope', 'profileServ', '$routeParams',
		function($scope, profileServ, $routeParams) {

			// get data from profileServices.js
			profileServ.get(function(data) {
				$scope.profileData = data;
				//console.log(data);
			}, $routeParams.fb_id);

		}
	]);

})();
