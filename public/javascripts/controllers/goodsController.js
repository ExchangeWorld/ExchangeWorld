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
		goodsServ.getGoodsData($routeParams.gid)
			.then(function(data){
				//promise fulfilled (successed)
				vm.goodsData = data;
			}, function(error){
				//promise rejected (failed)
				console.log('error', error);
			});
	}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		window.location.href = "#/profile/" + fb_id;
	}
}
