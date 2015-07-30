"use strict";

angular
	.module('goodsController', ['goodsServices'])
	.controller('goodsCtrl', goodsCtrl); //['$scope', 'goodsServ', '$routeParams',

function goodsCtrl($scope, goodsServ, $routeParams) {
	const vm       = this;
	vm.goodsData   = [];
	vm.onClickUser = onClickUser;

	// get data from goodsServices.js
	goodsServ.get(function(data) { vm.goodsData = data; }, $routeParams.gid);

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		window.location.href = "#/profile/" + fb_id;
	};
}
