'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profile, profileService, $state, $localStorage, auth) {
	var vm                 = this;
	const types            = ['following', 'follower'];
	vm.profile             = profile;
	vm.largePic            = '';
	vm.isLoggedIn          = Boolean($localStorage.user);
	vm.isMe                = vm.isLoggedIn ? (profile.uid === $localStorage.user.uid) : false;
	vm.onClickFollow       = onClickFollow;
	vm.onClickAddFollowing = onClickAddFollowing;
	vm.followerCount       = profile.followers.length;
	vm.isFollowed          = false;

	/////////////
	activate();

	function activate() {
		if(vm.isLoggedIn) {
			var idx = _.findIndex(profile.followers, function(user) { 
				return user.follower_uid === $localStorage.user.uid; 
			});
			if(idx !== -1) vm.isFollowed = true;
		}

		auth
			.getLoginState()
			.then(function(data) {
				if(data) {
					vm.isMe = (profile.uid === data.uid);
				} else {
					vm.isMe = false;
					vm.isLoggedIn = false;
				}
			});
	}

	function onClickFollow(uid, idx) {
		$state.go('root.withSidenav.follow', {
			uid: uid,
			type: types[idx]
		});
	}

	function onClickAddFollowing() {
		profileService.addFollowing($localStorage.user.uid, profile.uid);
		vm.followerCount++;
		vm.isFollowed = !vm.isFollowed;
	}
}
