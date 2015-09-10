'use strict';

const seekModule = require('./seek.module');
const _          = require('lodash');
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
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	$scope.onClickGoods    = onClickGoods;
	$scope.onMouseOver     = onMouseOver;
	$scope.onMouseOut      = onMouseOut;

	/////////////////

	$scope.$on('boundChanged', function(e, bound) {
		//console.log(bound.toUrlValue());
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory.label,
			bound    : bound.toUrlValue(),
		});
	});

	function onSearch(filter) {
		console.log(filter);
		$state.go($state.current.name, {
			name: filter.name,
			cate: filter.cate,
		});

		seekService
			.getSeek(filter)
			.then(function(data) {
				vm.goods = data.map(function(goods) {
					if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
					return goods;
				});
				$rootScope.$broadcast('goodsChanged', vm.goods);
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
