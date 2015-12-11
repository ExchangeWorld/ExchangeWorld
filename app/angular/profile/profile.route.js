'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
profileModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

var resolve = {
	/** @ngInject */
	profile : function (profileService, $state, $stateParams) {
		return profileService
			.getProfile($stateParams.uid)
			.then(function(data) { 
				return data; 
			})
			.catch(function() { return undefined; });
	},
	/** @ngInject */
	myGoods : function($stateParams, profileService) {
		return profileService
			.getMyGoods($stateParams.uid)
			.then(function(data) {
				return {
					myGoodsPending   : data.filter(function(g) { return g.status === 0; }),
					myGoodsExchanged : data.filter(function(g) { return g.status === 1; })
				};
			});
	},
	/** @ngInject */
	myFavorite : function($stateParams, favorite) {
		return favorite
			.getMyFavorite($stateParams.uid)
			.then(function(data) {
				return data.map(function(g) {
					if (_.isString(g.good.photo_path)) g.good.photo_path = JSON.parse(g.good.photo_path);
					return g.good;
				});
			});
	}
};

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
