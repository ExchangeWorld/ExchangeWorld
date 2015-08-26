'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, $state) {
	const vm       = this;
	vm.goodData    = goodData;
	vm.onClickUser = onClickUser;


	function activate() {

	}

	// define onClick event on goods owner
	function onClickUser(_uid) {
		$state.go('root.withSidenav.profile', { uid : _uid });
	}
}
