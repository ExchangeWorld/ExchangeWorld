'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodsService, $stateParams, $state) {
	var vm         = this;
	vm.goodsData   = [];
	vm.onClickUser = onClickUser;

	activate();

	/////////////

	function activate() {
		// get data from goodsServices.js
		goodsService.getGoodsData($stateParams.gid)
			.then(function(data){
				//promise fulfilled (successed)
				vm.goodsData = data[0];
				//console.log(vm.goodsData);
			}).catch(function(error){
				//promise rejected (failed)
				console.log('error', error);
			});
	}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		$state.go('root.withSidenav.profile', {fid: fb_id});
	}
}
