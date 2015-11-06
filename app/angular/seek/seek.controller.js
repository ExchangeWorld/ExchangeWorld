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
	$stateParams,
	$location
) {
	var vm                 = this;
	vm.goods               = [];
	vm.mapBound            = '';
	vm.searchGoodsName     = $stateParams.name;
	vm.searchGoodsCategory = $stateParams.cate || '';
	vm.searchWithBound     = $stateParams.g === '0' ? true : false;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	$scope.onClickFavorite = onClickFavorite;
	$scope.onClickUser     = onClickUser;
	$scope.onClickGoods    = onClickGoods;
	$scope.onMouseOver     = onMouseOver;
	$scope.onMouseOut      = onMouseOut;

	////////////////
	
	$scope.$on('boundChanged', function(e, bound) {
		//console.log(bound.toUrlValue());
		vm.mapBound = bound.toUrlValue();
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory,
			bound    : vm.searchWithBound ? vm.mapBound : '',
			global   : vm.searchWithBound ? 0 : 1,
		});
	});

	function onSearch(filter) {
		console.log(filter);
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
		console.log(uid);
		$state.go('root.withSidenav.profile', {
			uid: uid
		});
	}
}
