'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
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
						console.log('fucker');
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
					/** @ngInject */
					myGoods : function($stateParams, profileService) {
						return profileService
							.getMyGoods($stateParams.uid)
							.then(function(data) {
								return {
									myGoodsPending   : data.filter(function(g) { return g.status === 0; }),
									myGoodsExchanged : data.filter(function(g) { return g.status === 1; })
								};
								//$rootScope.$broadcast('goodsChanged', vm.myGoodsPending);
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
				},
			}
		}
	];
}
