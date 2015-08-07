'use strict';

const profileModule = require('./profile.module');
profileModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.profile',
			config : {
				url : '/profile/:fid',
				bindToController: true,
				controller : 'ProfileController',
				controllerAs: 'vm',
				templateUrl : 'profile/profile.html',
				title : 'profile'
			}
		}
	];
}
