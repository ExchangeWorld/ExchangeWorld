'use strict';

const seekModule = require('./seek.module');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(seekService, $state, AvailableCategory, $scope, $rootScope) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = '';
	vm.searchGoodsCategory = '';
	vm.onClickGoods        = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;

	$scope.$on('boundChanged', function(e, bound) {
		console.log(bound);
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory.label,
		});
	})

	function onSearch(filter) {
		seekService
			.getSeek(filter)
			.then(function(data) {
				$rootScope.$broadcast('goodsChanged', data);
				vm.goods = data;
			})
			.catch(function() {
				vm.goods = [];
			});
	}


	//goods onClick event: change route to corrsponding gid
	function onClickGoods(_gid) {
		$state.go('root.withSidenav.goods', { gid: _gid });
	}

}
