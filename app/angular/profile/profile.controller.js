'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(
	profile,
	profileService,
	auth,
	message,
	$state,
	$stateParams,
	$localStorage
) {
	var vm                 = this;
	const types            = ['following', 'follower'];
	vm.profile             = profile;
	vm.largePic            = '';
	vm.isLoggedIn          = Boolean($localStorage.user);
	vm.isMe                = vm.isLoggedIn && (profile.uid === $localStorage.user.uid);
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
							vm.myGoodsPending  = data.filter(function(g) { return g.status === 0; });
							vm.myGoodsExchange = data.filter(function(g) { return g.status === 1; });
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
		profileService.addFollowing($localStorage.user.uid, profile.uid);
		// should add unfollow code here
		vm.isFollowed = !vm.isFollowed;
		if (!vm.isFollowed) {
			vm.followerCount--;
		} else {
			vm.followerCount++;
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
}
