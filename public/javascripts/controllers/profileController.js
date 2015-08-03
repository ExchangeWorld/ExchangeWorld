"use strict";

angular
	.module('ProfileController', ['profileServices'])
	.controller('ProfileCtrl', profileCtrl);

function profileCtrl($scope, profileServ, $routeParams) {
	var vm         = this;
	vm.profileData = [];

	activate();

	/////////////

	function activate() {
		// get data from profileServices.js
		profileServ.getProfileData($routeParams.fb_id)
			.then(function(data) {
				vm.profileData = data;
			}, function(error) {
				console.log('error', error);
			});
	}
}
