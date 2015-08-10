'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, goodsService, $stateParams, $state) {
	const vm       = this;
	vm.goodsData   = goodData;
	vm.onClickUser = onClickUser;
	//activate();

	/////////////

	//function activate() {
	//	// get data from goodsServices.js
	//	console.log(goodData);
	//	goodsService
	//		.getGood($stateParams.gid)
	//		.then(function(data) {
	//			vm.goodsData = data;
	//		})
	//		//.catch(function(error){
	//		//	console.log('error', error);
	//		//});
	//}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		$state.go('root.withSidenav.profile', { fid : fb_id });
	}
}
