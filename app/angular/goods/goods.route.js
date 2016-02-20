'use strict';
const _           = require('lodash');
const goodsModule = require('./goods.module');
goodsModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [{
		state: 'root.withSidenav.goods',
		config: {
			url: '/seek/:gid',
			bindToController: true,
			controller: 'GoodsController',
			controllerAs: 'vm',
			templateUrl: 'goods/goods.html',
			title: 'goods',
			resolve: {
				/** @ngInject */
				goodData: function(goodsService, $stateParams, $state) {
					return goodsService
						.getGood($stateParams.gid)
						.then(function(data) {
							if (data.length === 0) {
								$state.go('root.404');
							}
							return data;
						}, (error) => {
							$state.go('root.404');
						});
				},
				/** @ngInject */
				comments: function(goodsService, $stateParams) {
					return goodsService
						.getComment($stateParams.gid)
						.then(function(comments) {
							if (!_.isArray(comments)) return [];
							else return comments;
						})
						.catch(function() {
							return undefined;
						});
				}

			},
		}
	}, {
		state: 'root.withSidenav.goods.queue',
		config: {
			url: '/queue',
			templateUrl: 'goods/goods.queue.html',
			resolve: {
				/** @ngInject */
				hostUid: (goodsService, $stateParams) => {
					return goodsService
						.getGood($stateParams.gid)
						.then(function(data) {
							return _.isArray(data) ? data[0].owner_uid : data.owner_uid;
						})
						.catch(function() {
							return undefined;
						});
				},
				/** @ngInject */
				myGoods: (goodsService, $localStorage) => {
					return goodsService
						.getUserGoods($localStorage.user.uid)
						.then(function(myGoods) {
							return myGoods;
						});
				},
				/** @ngInject */
				queuingGoodsGid: ($stateParams) => {
					return parseInt($stateParams.gid, 10);
				}
			},
			/** @ngInject */
			onEnter: (goodsService, myGoods, hostUid, queuingGoodsGid, $rootScope) => {
				$rootScope.historyCounter++;
				goodsService.showQueueBox(null, myGoods, queuingGoodsGid, hostUid);
			}
		}
	}, {
		state: 'root.withSidenav.goods.queuing',
		config: {
			url: '/queuing',
			templateUrl: 'goods/goods.queuing.html',
			resolve: {
				/** @ngInject */
				hostGoodsGid: ($stateParams) => {
					return parseInt($stateParams.gid, 10);
				},
				/** @ngInject */
				queuingGoods: (goodsService, $stateParams) => {
					return goodsService
						.getQueue($stateParams.gid)
						.then(function(data) {
							return data;
						});
				},
			},
			/** @ngInject */
			onEnter: (goodsService, queuingGoods, hostGoodsGid, $rootScope) => {
				$rootScope.historyCounter++;
				goodsService.showQueuingBox(null, queuingGoods, hostGoodsGid);
			}
		}
	}];
}
