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
	$rootScope,
	$localStorage,
	$stateParams
) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = $stateParams.name;
	vm.searchGoodsCategory = $stateParams.cate || '';
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
	$scope.onClickFavorite = onClickFavorite;
	$scope.onClickGoods    = onClickGoods;
	$scope.onMouseOver     = onMouseOver;
	$scope.onMouseOut      = onMouseOut;

	////////////////

	$scope.$on('boundChanged', function(e, bound) {
		//console.log(bound.toUrlValue());
		onSearch({
			name     : vm.searchGoodsName,
			category : vm.searchGoodsCategory,
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

	function onClickFavorite(goods) {
		if (!Boolean($localStorage.user)) {
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
}
