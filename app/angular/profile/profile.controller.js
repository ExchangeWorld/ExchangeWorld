'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profile, $state, facebookService) {
	var vm              = this;
	vm.profile          = profile;
	vm.largePic         = '';
	vm.followerCount    = vm.profile.followers.length;
	vm.followingCount   = vm.profile.followings.length;
	vm.onClickFollower  = onClickFollower;
	vm.onClickFollowing = onClickFollowing;

	console.log(vm.profile);
	/////////////
	activate();

	function activate() {
		facebookService
			.getLargePicture(profile.fb_id)
			.then(function(img) {
				vm.largePic = img.data.url;
			});
	}

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
