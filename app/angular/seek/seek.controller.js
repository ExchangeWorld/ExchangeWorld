'use strict';

const seekModule = require('./seek.module');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(seekService, $state, AvailableCategory, $scope) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = '';
	vm.searchGoodsCategory = '';
	vm.onClickGoods        = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;

	$scope.$on('boundChanged', function(e, bound) {
		console.log(bound);
	})

	activate();

	/////////

	function activate() {
		onSearch();
	}

	function onSearch() {

		seekService
			.getSeek({
				name     : vm.searchGoodsName,
				category : vm.searchGoodsCategory.label,
			})
			.then(function(data) {
				console.log(data);
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

}
