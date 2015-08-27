'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, $state, $scope, $timeout) {
	const vm       = this;
	vm.goodData    = goodData;
	vm.onClickUser = onClickUser;

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$timeout(function() {
			$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
		}, 50);
	}

	// define onClick event on goods owner
	function onClickUser(_uid) {
		$state.go('root.withSidenav.profile', { uid : _uid });
	}
}
