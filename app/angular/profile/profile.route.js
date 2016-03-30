'use strict';

const profileModule = require('./profile.module');
profileModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

var resolve = {
	/** @ngInject */
	profile: function (profileService, $state, $stateParams) {
		return profileService
			.getProfile($stateParams.uid)
			.then(function(data) { 
				return data; 
			})
			.catch(function() {
				return {};
			});
	}
};

function getStates() {
	return [
		{
			state : 'root.oneCol.profile',
			config : {
				url : '/profile/:uid',
				bindToController: true,
				controller : 'ProfileController',
				controllerAs: 'vm',
				templateUrl : 'profile/profile.html',
				resolve : resolve,
				/** @ngInject */
				onEnter: function($localStorage, $state, $stateParams, $timeout) {
					if ($localStorage.user !== null){
						if (parseInt($stateParams.uid, 10) === $localStorage.user.uid) {
							$timeout(() => $state.go('root.oneCol.me'));
							return;
						}
					}
				}
			}
		}
	];
}
