'use strict';

const followModule = require('./follow.module');
followModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.oneCol.follow',
			config : {
				url : '/profile/:uid/:type',
				bindToController: true,
				scope: {},
				controller : 'FollowController',
				controllerAs: 'vm',
				templateUrl : 'follow/follow.html',
			}
		}
	];
}
