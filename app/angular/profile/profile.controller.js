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
	logger,
	$state,
	$stateParams,
	$rootScope,
	$localStorage,
	$timeout,
	$sce
) {
	var vm                 = this;
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
	vm.getHTMLDesc         = getHTMLDesc;
	/////////////

	activate();

	function activate() {
		if ($rootScope.isLoggedIn) {
			if (_.findWhere(profile.follows_followed, { uid: $localStorage.user.uid })) {
				vm.isFollowed = true;
			}
		}

		//TODO; use /api/user/me
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

	}

	function onClickAddFollowing() {
		if (vm.isFollowed) {
			followService.deleteFollowing($localStorage.user.uid, profile.uid);

			vm.profile.follows_followed.pop();
			vm.isFollowed = false;
		} else {
			followService.addFollowing($localStorage.user.uid, profile.uid);

			vm.profile.follows_followed.push({});
			vm.isFollowed = true;
		}
	}

	function onClickSendMsg(ev, uid) {
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

	function getHTMLDesc(desc) {
		return $sce.trustAsHtml(marked(desc));
	}

}
