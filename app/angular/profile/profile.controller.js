'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profile, $state) {
	var vm              = this;
	vm.profile          = profile;
	vm.largePic         = '';
	vm.followerCount    = vm.profile.followers.length;
	vm.followingCount   = vm.profile.followings.length;
	vm.onClickFollower  = onClickFollower;
	vm.onClickFollowing = onClickFollowing;

	console.log(vm.profile);
	/////////////

	function onClickFollower(uid) {
		$state.go('root.withSidenav.follow', {
			uid: uid,
			type: 'follower'
		});
	}

	function onClickFollowing(uid) {
		$state.go('root.withSidenav.follow', {
			uid: uid,
			type: 'following'
		});
	}
}
