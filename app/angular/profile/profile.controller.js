'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
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
	message,
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
	vm.editPhoto           = editPhoto;
	/////////////

	activate();

	function activate() {
		//TODO; use /api/user/me
		if ($localStorage.user) {
			vm.isMe = (profile.uid === $localStorage.user.uid);
			if (_.findWhere(profile.follows_followed, { follower_uid: $localStorage.user.uid })) {
				vm.isFollowed = true;
			}
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
		message.showMessagebox(ev, vm.profile.uid);
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
	}

	function editPhoto() {
		if (!vm.isMe) return;

		profileService.uploadHeadPhoto(profile);
	}
}
