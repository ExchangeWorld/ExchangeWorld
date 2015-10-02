'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(
	profile,
	profileService,
	favorite,
	auth,
	message,
	notification,
	$scope,
	$state,
	$stateParams,
	$rootScope,
	$localStorage
) {
	var vm                 = this;
	const types            = ['following', 'follower'];
	vm.profile             = profile;
	vm.largePic            = '';
	vm.isLoggedIn          = Boolean($localStorage.user);
	vm.isMe                = vm.isLoggedIn && (profile.uid === $localStorage.user.uid);
	vm.myStar              = [];
	vm.myGoodsPending      = [];
	vm.myGoodsExchanged    = [];
	vm.onClickFollow       = onClickFollow;
	vm.onClickAddFollowing = onClickAddFollowing;
	vm.onClickSendMsg      = onClickSendMsg;
	vm.followerCount       = profile.followers.length;
	vm.isFollowed          = false;
	vm.isReadOnly          = true;
	vm.onClickEdit         = function onClickEdit() { vm.isReadOnly = !vm.isReadOnly; };
	vm.onClickSave         = onClickSave;
	vm.getNumber           = number => new Array(number);
	vm.onClickGoods        = onClickGoods;


	/////////////
	activate();

	function activate() {
		if (vm.isLoggedIn) {
			if (_.findWhere(profile.followers, { follower_uid: $localStorage.user.uid })) {
				vm.isFollowed = true;
			}
		}

		auth
			.getLoginState()
			.then(function(data) {
				if (data) {
					vm.isMe = (profile.uid === data.uid);
					profileService
						.getMyGoods($stateParams.uid)
						.then(function(data) {
							vm.myGoodsPending   = data.filter(function(g) { return g.status === 0; });
							vm.myGoodsExchanged = data.filter(function(g) { return g.status === 1; });
							$rootScope.$broadcast('goodsChanged', vm.myGoodsPending);
						});
					favorite
						.getMyFavorite($stateParams.uid)
						.then(function(data) {
							vm.myStar = data.map(function(g) {
								if (_.isString(g.good.photo_path)) g.good.photo_path = JSON.parse(g.good.photo_path);
								return g.good;
							});
							console.log(vm.myStar);
						});
				} else {
					vm.isMe = false;
					vm.isLoggedIn = false;
				}
			});
	}

	function onClickFollow(uid, index) {
		$state.go('root.withSidenav.follow', {
			uid: uid,
			type: types[index]
		});
	}

	function onClickAddFollowing() {
		if (vm.isFollowed) {
			profileService.deleteFollowing($localStorage.user.uid, profile.uid);
			vm.followerCount--;
			vm.isFollowed = false;
		} else {
			profileService.addFollowing($localStorage.user.uid, profile.uid);
			notification
				.postNotification({
					sender_uid   : $localStorage.user.uid,
					receiver_uid : vm.profile.uid, 
					trigger      : '/profile/'+$localStorage.user.uid,
					content      : '有人跟隨你',
				});
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
		message.showMessagebox(ev, msg);
	}

	function onClickSave() {
		vm.isReadOnly = !vm.isReadOnly;

		profileService
			.editProfile(vm.profile)
			.then(function(data) {
				console.log(data);
			});
	}

	function onClickGoods(gid) {
		$state.go('root.withSidenav.goods', { gid : gid });
	}

}
