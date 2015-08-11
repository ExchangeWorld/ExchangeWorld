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
			state : 'root.withSidenav.profile',
			config : {
				url : '/profile/:fid',
				bindToController: true,
				controller : 'ProfileController',
				controllerAs: 'vm',
				templateUrl : 'profile/profile.html',
				resolve : {
					profile : function (profileService, $stateParams) {
						return profileService
							.getProfile($stateParams.fid)
							.then(function(data) { return data; })
							.catch(function() { return undefined; });
					},
				},
			}
		}
	];
}
