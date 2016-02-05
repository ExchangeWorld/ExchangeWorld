'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
const marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: false,
	tables: false,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: false,
	smartypants: false
});

profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(
	profile,
	myFavorite,
	profileService,
	followService,
	auth,
	notification,
	colorThief,
	logger,
	$state,
	$stateParams,
	$rootScope,
	$localStorage,
	$timeout,
	$sce
) {
	var vm                 = this;
	var ct                 = new colorThief.ColorThief();
	vm.profile             = profile;
	vm.isMe                = $rootScope.isLoggedIn && (profile.uid === $localStorage.user.uid);
	vm.favSum              = '';
	vm.myStar              = myFavorite;
	vm.myGoodsPending      = profile.myGoodsPending;
	vm.myGoodsExchanged    = profile.myGoodsExchanged;
	vm.onClickAddFollowing = onClickAddFollowing;
	vm.onClickSendMsg      = onClickSendMsg;
	vm.isFollowed          = false;
	vm.isReadOnly          = true;
	vm.onClickEdit         = onClickEdit;
	vm.getNumber           = number => new Array(number);
	vm.onClickGoods        = gid => $state.go('root.withSidenav.goods', { gid : gid });
	vm.getHTMLDesc = getHTMLDesc;
	/////////////

	activate();

	function activate() {
		if ($rootScope.isLoggedIn) {
			if (_.findWhere(profile.follows_followed, { fid: $localStorage.user.uid })) {
				vm.isFollowed = true;
			}
		}

		if ($localStorage.user) {
			vm.isMe = (profile.uid === $localStorage.user.uid);
		} else {
			vm.isMe = false;
			$rootScope.isLoggedIn = false;
		}

		profileService
			.getFavoriteSum($stateParams.uid)
			.then(function(data) {
				vm.favSum = data;
			});

		/**
		 * only do this on desktop mode.
		 */
		if($state.current.name === 'root.withSidenav.profile') {
			[...vm.myStar, ...vm.myGoodsPending, ...vm.myGoodsExchanged].forEach((goods)=> {
				dominateColor(goods);
			});
		} else {
			[...vm.myStar, ...vm.myGoodsPending, ...vm.myGoodsExchanged].forEach((goods)=> {
				goods.bgStyle = {
					"background-color": 'rgb(0, 0, 0)'
				};
			});
		}
		$rootScope.$broadcast('goodsChanged', vm.profile.goods);
	}

	function onClickAddFollowing() {
		if (vm.isFollowed) {
			followService.deleteFollowing($localStorage.user.uid, profile.uid);

			vm.followerCount--;
			vm.isFollowed = false;
		} else {
			followService.addFollowing($localStorage.user.uid, profile.uid);

			vm.followerCount++;
			vm.isFollowed = true;
		}
	}

	function onClickSendMsg(ev, uid) {
		var msg = {
			sender_uid   : uid,
			user         : profile,
			receiver_uid : $localStorage.user.uid,
			isNewMsg     : true,
		};
		$rootScope.onClickMessage(ev, msg);
	}

	function onClickEdit() {
		if(!vm.isReadOnly) {
			profileService
				.editProfile(vm.profile)
				.then(function(data) {
					logger.success('更新成功', data, 'EDIT');
				})
				.catch(function(err) {
					logger.error('錯誤', err, 'Error');
				});
		}
		vm.isReadOnly = !vm.isReadOnly;
	}

	function dominateColor(goods) {
		if (!goods.length) return;
		var image = document.getElementById(`img_${goods.gid}`);
		image.onload = ()=> {
			var color = ct.getColor(image);
			goods.bgStyle = {
				"background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`
			};
		};
	}

	function getHTMLDesc(desc) {
		return $sce.trustAsHtml(marked(desc));
	}

}
