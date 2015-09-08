'use strict';

const seekModule = require('./seek.module');
const _ = require('lodash');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(
	seekService,
	$state,
	AvailableCategory,
	$scope,
	$rootScope,
	$stateParams
) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = $stateParams.name;
	vm.searchGoodsCategory = $stateParams.cate || '';
	$scope.onClickGoods    = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	vm.onMouseOver         = onMouseOver;
	vm.onMouseOut          = onMouseOut;

	$scope.$on('boundChanged', function(e, bound) {
		console.log(bound.toUrlValue());
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory.label,
			bound    : bound.toUrlValue(),
		});
	});

	function onSearch(filter) {
		$state.go($state.current.name, {
			name: filter.name,
			cate: filter.cate,
		});
		
		seekService
			.getSeek(filter)
			.then(function(data) {
				$rootScope.$broadcast('goodsChanged', data);
				vm.goods = data;
				console.log(data);
			})
			.catch(function() {
				vm.goods = [];
			});
	}

	function onMouseOver(gid) {
		$rootScope.$broadcast('openGoodsOverlay', gid);
	}

	function onMouseOut() {
		$rootScope.$broadcast('closeGoodsOverlay');
	}

	//goods onClick event: change route to corrsponding gid
	function onClickGoods(gid) {
		$state.go('root.withSidenav.goods', { gid : gid });
	}
}
