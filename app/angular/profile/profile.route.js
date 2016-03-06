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
				return undefined;
			});
	},
	/** @ngInject */
	myFavorite: function($stateParams, favorite) {
		return favorite
			.getMyFavorite($stateParams.uid)
			.then(function(data) {
				return data.map(function(g) {
					try {
						g.goods.photo_path = JSON.parse(g.goods.photo_path);
					} catch (err) {
						g.goods.photo_path = '';
					}
					return g.goods;
				});
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
				resolve : resolve,
			}
		}
	];
}
