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
				url : '/profile/:uid',
				bindToController: true,
				controller : 'ProfileController',
				controllerAs: 'vm',
				templateUrl : 'profile/profile.html',
				resolve : {
					/** @ngInject */
					profile : function (profileService, $state, $stateParams) {
						return profileService
							.getProfile($stateParams.uid)
							.then(function(data) { 
								return data; 
							})
							.catch(function() { return undefined; });
					},
				},
			}
		},
		{
			state : 'root.oneCol.m_profile',
			config : {
				url : '/m_profile/:uid',
				bindToController: true,
				controller : 'ProfileController',
				controllerAs: 'vm',
				templateUrl : 'profile/profile.html',
				resolve : {
					/** @ngInject */
					profile : function (profileService, $state, $stateParams) {
						return profileService
							.getProfile($stateParams.uid)
							.then(function(data) {
								return data;
							})
							.catch(function() { return undefined; });
					},
				},
			}
		}
	];
}
