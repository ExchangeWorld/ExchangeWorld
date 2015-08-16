'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, $state) {
	const vm       = this;
	vm.goodData    = goodData;
	vm.onClickUser = onClickUser;

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', { uid : uid });
	}
}
