'use strict';

const seekModule = require('./seek.module');
const _          = require('lodash');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(
	auth,
	seekService,
	favorite,
	notification,
	AvailableCategory,
	$state,
	$scope,
	$rootScope,
	$localStorage,
	$stateParams
) {
	const vm               = this;
	vm.goods               = [];
	vm.mapBound            = '';
	vm.searchGoodsName     = $stateParams.name;
	vm.searchGoodsCategory = $stateParams.cate || '';
	vm.searchWithBound     = $stateParams.g !== '1';
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	vm.onClickFavorite = onClickFavorite;
	vm.onClickUser     = onClickUser;
	vm.onMouseOver     = onMouseOver;
	vm.onMouseOut      = onMouseOut;
	vm.postfixImageUrl = postfixImageUrl;
	vm.postfixImageUrl = postfixImageUrl;
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
		});
	});

	function onSearch(filter) {
		if(vm.searchGoodsCategory === 'all') {
			filter.category = '';
		}
		$state.go($state.current.name, {
			name  : filter.name,
			cate  : filter.category,
			bound : filter.global ? '' : filter.bound,
			g     : filter.global ? 1 : 0,
		});

		seekService
			.getSeek(filter)
			.then(function(data) {
				vm.goods = data;
				$rootScope.$broadcast('goodsChanged', vm.goods);
				vm.loading = false;
			})
			.catch(function() {
				vm.goods = [];
				vm.loading = false;
			});
	}

	function onMouseOver(gid) {
		// $rootScope.$broadcast('openGoodsOverlay', gid);
		$rootScope.$broadcast('highlightMarker', gid);
		
	}

	function onMouseOut(gid) {
		$rootScope.$broadcast('highlightMarker', gid);
		// $rootScope.$broadcast('closeGoodsOverlay');
	}

	function onClickFavorite(e, goods) {
		e.preventDefault();
		e.stopPropagation();
		if (!$localStorage.user) {
			auth
				.login()
				.then(function(user) {
					vm.isLoggedIn = Boolean(user);
					$state.reload();
				});
		} else {
			const star = {
				starring_user_uid: $localStorage.user.uid,
				goods_gid: goods.gid,
			};

			if (!goods.favorited) {
				favorite
					.postFavorite(star)
					.then(function() {
						var idx = _.indexOf(vm.goods, goods);
						vm.goods[idx].favorited = true;
					});

				notification
					.postNotification({
						sender_uid   : $localStorage.user.uid,
						receiver_uid : goods.owner_uid,
						trigger_url  : '/seek/' + goods.gid,
						content      : '有人關注你的物品',
					});
			} else {
				favorite
					.deleteFavorite(star)
					.then(function() {
						var idx = _.indexOf(vm.goods, goods);
						vm.goods[idx].favorited = false;
					});
			}
		}
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
