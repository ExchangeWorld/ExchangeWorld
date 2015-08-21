'use strict';

const followModule = require('./follow.module');
const _            = require('lodash');

followModule.controller('FollowController', FollowController);

/** @ngInject */
function FollowController($state, followService, $stateParams) {
	var vm         = this;
	const types    = ['following', 'follower'];
	vm.type        = '';
	vm.followData  = [];
	vm.onClickUser = onClickUser;

	/////////////
	activate();

	function activate() {
		if (!_.includes(types, $stateParams.type)) {
			/**
			 * If url not follower/following,
			 * redirect it to seek
			 */
			$state.go('root.withSidenav.seek');

		} else {
			vm.type = $stateParams.type;

			if (vm.type === 'following') {
				followService
					.getFollowing($stateParams.uid)
					.then(function(data) {
						vm.followData = data;
						console.log(vm.followData);
					})
					.catch(function() {
						vm.followData = undefined;
					});
			} else if (vm.type === 'follower') {
				followService
					.getFollower($stateParams.uid)
					.then(function(data) {
						vm.followData = data;
						console.log(vm.followData);
					})
					.catch(function() {
						vm.followData = undefined;
					});
			}
		}
	}

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', {
			uid: uid
		});
	}
}
