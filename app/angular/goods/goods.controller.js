'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, $state) {
	const vm       = this;
	vm.goodData    = goodData;
	vm.onClickUser = onClickUser;

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		$state.go('root.withSidenav.profile', { fid : fb_id });
	}
}
