'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profile, $state, $localStorage, auth) {
	var vm           = this;
	const types      = ['following', 'follower'];
	vm.profile       = profile;
	vm.largePic      = '';
	vm.isLoggedIn    = $localStorage.user ? true : false;
	vm.isMe          = vm.isLoggedIn ? (profile.uid === $localStorage.user.uid) : false;
	vm.onClickFollow = onClickFollow;


	/////////////
	activate();

	function activate(){
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
}
