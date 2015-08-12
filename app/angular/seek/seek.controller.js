'use strict';

const seekModule = require('./seek.module');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(seekService, $state, AvailableCategory) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = '';
	vm.searchGoodsCategory = '';
	vm.onClickGoods        = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory = AvailableCategory;

	activate();

	/////////

	function activate() {
		seekService
			.getSeek({})
			.then(function(data) {
				vm.goods = data;
			})
			.catch(function() {
				vm.goods = undefined;
			});
	}

	//goods onClick event: change route to corrsponding gid
	function onClickGoods(_gid) {
		$state.go('root.withSidenav.goods', { gid: _gid });
	}

	function onSearch(){
		var constrain = {
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory,
		};
		console.log(constrain);

		seekService
			.getSeek(constrain)
			.then(function(data) {
				console.log(data);
				vm.goods = data;
			})
			.catch(function() {
				vm.goods = undefined;
			});
	}
}
