'use strict';

const seekModule = require('./seek.module');
const _ = require('lodash');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(seekService, $state, AvailableCategory, $scope) {
	var vm                 = this;
	// var map                = undefined;
	vm.goods               = [];
	vm.searchGoodsName     = '';
	vm.searchGoodsCategory = '';
	vm.onClickGoods        = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	vm.onMouseOver         = onMouseOver;
	vm.onMouseOut          = onMouseOut;

	$scope.$on('boundChanged', function(e, bound) {
		console.log(bound);
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory.label,
		});
	});

	function onSearch(filter) {
		seekService
			.getSeek(filter)
			.then(function(data) {
				$scope.$parent.$broadcast('goodsChanged', data);
				vm.goods = data;
			})
			.catch(function() {
				vm.goods = [];
			});
	}

	function onMouseOver(gid) {
		$scope.$parent.$broadcast('openGoodsOverlay', gid);
	}

	function onMouseOut() {
		$scope.$parent.$broadcast('closeGoodsOverlay');
	}

	//goods onClick event: change route to corrsponding gid
	function onClickGoods(gid) {
		$scope.$parent.$broadcast('mapMoveTo', gid);
		$state.go('root.withSidenav.goods', { gid : gid });
	}
}
