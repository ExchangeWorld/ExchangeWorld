'use strict';

const seekModule = require('./seek.module');
const _          = require('lodash');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(
	auth,
	seekService,
	favorite,
	AvailableCategory,
	$state,
	$scope,
	$timeout,
	$rootScope,
	$localStorage,
	$stateParams
) {
	var vm                 = this;
	vm.goods               = [];
	vm.mapBound            = '';
	vm.searchGoodsName     = $stateParams.name;
	vm.searchGoodsCategory = $stateParams.cate || '';
	vm.searchWithBound     = $stateParams.g === '1' ? false : true;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	$scope.onClickFavorite = onClickFavorite;
	$scope.onClickUser     = onClickUser;
	$scope.onMouseOver     = onMouseOver;
	$scope.onMouseOut      = onMouseOut;
	$scope.postfixImageUrl = postfixImageUrl;
	vm.postfixImageUrl     = postfixImageUrl;
	vm.loading             = false;

	////////////////

	$scope.$on('boundChanged', function(e, bound) {
		vm.loading = true;
		vm.mapBound = bound.toUrlValue();
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory,
			bound    : vm.searchWithBound ? vm.mapBound : '',
			global   : vm.searchWithBound ? 0 : 1,

	$scope.$watch('vm.searchGoodsCategory', function() {
		onSearch({
			name: vm.searchGoodsName,
			category: vm.searchGoodsCategory,
			bound: vm.searchWithBound ? vm.mapBound : '',
			global: vm.searchWithBound ? 0 : 1
		});
	});

	async function onSearch(filter) {
		if(vm.searchGoodsCategory === 'all') {
			filter.category = '';
		}
		$state.go($state.current.name, {
			name  : filter.name,
			cate  : filter.category,
			bound : filter.global ? '' : filter.bound,
			g     : filter.global ? 1 : 0,
		});

		try {
			vm.loading = true;
			vm.goods = await seekService.getSeek(filter);
			$timeout(() => {
				$rootScope.$broadcast('goodsChanged', vm.goods);
				vm.loading = false;
			});
		} catch (err) {
			vm.goods = [];
			vm.loading = false;
		}
	}

	function onMouseOver(gid) {
		// $rootScope.$broadcast('openGoodsOverlay', gid);
		$rootScope.$broadcast('highlightMarker', gid);
	}

	function onMouseOut(gid) {
		$rootScope.$broadcast('highlightMarker', gid);
		// $rootScope.$broadcast('closeGoodsOverlay');
	}

	async function onClickFavorite(e, goods) {
		e.preventDefault();
		e.stopPropagation();

		if (!$rootScope.isLoggedIn) {
			$rootScope.openSignupModal();
			return;
		}

		let isFavorite = await favorite.favorite(goods);
		$timeout(() => {
			let idx = _.indexOf(vm.goods, goods);
			vm.goods[idx].starredByUser = isFavorite;
		});
	}

	function onClickUser(e, uid) {
		e.preventDefault();
		e.stopPropagation();
		$rootScope.onClickUser(uid);
	}

	function postfixImageUrl(url) {
		if (typeof(url) !== 'string') return url;

		url = url.split('.');
		url[url.length - 2] += '-250';

		return url.join('.');
	}
}
