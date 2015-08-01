"use strict";

angular
	.module('GoodsController', ['goodsServices'])
	.controller('GoodsCtrl', goodsCtrl);

function goodsCtrl($scope, goodsServ, $routeParams) {
	var vm         = this;
	vm.goodsData   = [];
	vm.onClickUser = onClickUser;

	activate();

	/////////////

	function activate() {
		// get data from goodsServices.js
		goodsServ.get(callback, $routeParams.gid);

		function callback(data) {
			vm.goodsData = data;
		}
	}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		window.location.href = "#/profile/" + fb_id;
	}
}
