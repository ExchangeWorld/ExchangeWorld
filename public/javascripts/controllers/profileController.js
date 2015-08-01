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
		profileServ.get(callback, $routeParams.fb_id);

		function callback(data) {
			vm.profileData = data;
		}
	}
}
