//(function() {
"use strict";

angular
	.module('ProfileController', ['profileServices'])
	.controller('ProfileCtrl', profileCtrl);

function profileCtrl($scope, profileServ, $routeParams) {
	var vm            = this;
	vm.profileData    = [];
	//vm.onClickGoods = onClickGoods;

	// get data from profileServices.js
	profileServ.get(function(data) { vm.profileData = data; }, $routeParams.fb_id);
}
