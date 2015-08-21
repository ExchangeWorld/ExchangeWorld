'use strict';

const followModule = require('./follow.module');
followModule.controller('FollowController', FollowController);

/** @ngInject */
function FollowController($state, followService) {
	var vm         = this;
	var followData;
	var onClickUser = onClickUser;


	activate();
	/////////////
	function activate() {
		followService
			.getFollower()
			.then(function(data) {
				//console.log(data);
				vm.followData = data;
			})
			.catch(function() {
				vm.followData = undefined;
			});
	}

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', { uid : uid });
	}
}
