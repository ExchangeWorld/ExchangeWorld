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
		profileServ.get(collectProfileData, $routeParams.fb_id);

		function collectProfileData(data) {
			vm.profileData = data;
		}
	}
}
