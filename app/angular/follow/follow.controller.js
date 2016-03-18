'use strict';

const followModule = require('./follow.module');
const _            = require('lodash');

followModule.controller('FollowController', FollowController);

/** @ngInject */
function FollowController($state, followService, $stateParams, $rootScope, $timeout) {
	var vm         = this;
	const types    = ['following', 'follower'];
	vm.type        = '';
	vm.followData  = [];
	vm.onClickBack = $rootScope.onClickUser.bind(this, $stateParams.uid);
	vm.loading     = true;

	/////////////
	activate();

	function activate() {
		if (!_.includes(types, $stateParams.type)) {
			$state.go('root.404');
		} else {
			vm.type = $stateParams.type;
			
			followService
				.getFollow($stateParams.uid, $stateParams.type)
				.then(function(data) {
					vm.followData = data;
					$timeout(()=>{ vm.loading = false; });
				})
				.catch(function() {
					vm.followData = undefined;
					vm.loading    = false;
				});
		}
	}
}
