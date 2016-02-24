'use strict';

const followModule = require('./follow.module');
const _            = require('lodash');

followModule.controller('FollowController', FollowController);

/** @ngInject */
function FollowController($state, followService, $stateParams, $rootScope) {
	var vm         = this;
	const types    = ['following', 'follower'];
	vm.type        = '';
	vm.followData  = [];
	vm.onClickBack = $rootScope.onClickUser.bind(this, $stateParams.uid);

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
				})
				.catch(function() {
					vm.followData = undefined;
				});
		}
	}
}
