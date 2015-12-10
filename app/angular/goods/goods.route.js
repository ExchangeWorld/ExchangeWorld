'use strict';
const _           = require('lodash');
const goodsModule = require('./goods.module');
goodsModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.withSidenav.goods',
			config : {
				url : '/seek/:gid',
				bindToController: true,
				controller : 'GoodsController',
				controllerAs: 'vm',
				templateUrl : 'goods/goods.html',
				title : 'goods',
				resolve : {
					/** @ngInject */
					goodData : function (goodsService, $stateParams, $state) {
						return goodsService
							.getGood($stateParams.gid)
							.then(function(data) {
								if(data.length === 0) {
									$state.go('root.404');
								}
								return data[0];
							}, (error) => {
								$state.go('root.404');
							});
					},
				},
			}
		},
		{
			state: 'root.withSidenav.goods.queue',
			config: {
				url: '/queue',
				templateUrl: 'goods/goods.queue.html',
				resolve: {
					/** @ngInject */
					host_uid: (goodsService, $stateParams)=> {
						return goodsService
							.getGood($stateParams.gid)
							.then(function(data) {
								return _.isArray(data) ? data[0].owner_uid: data.owner_uid;
							})
							.catch(function() { return undefined; });
					},
					/** @ngInject */
					myGoods: (goodsService, $localStorage)=> {
						return goodsService
							.getUserGoods($localStorage.user.uid)
							.then(function(myGoods) {
								myGoods = myGoods.filter(function(g) {
									return (g.status === 0 && g.deleted === 0);
								});
								return myGoods;
							});
					},
					/** @ngInject */
					queuing_goods_gid: ($stateParams)=>{
						return parseInt($stateParams.gid, 10); 
					}
				},
				/** @ngInject */
				onEnter: (goodsService, myGoods, host_uid, queuing_goods_gid)=> {
					goodsService.showQueueBox(null, myGoods, queuing_goods_gid, host_uid);
				}
			}
		},
		{
			state: 'root.withSidenav.goods.queuing',
			config: {
				url: '/queuing',
				templateUrl: 'goods/goods.queuing.html',
				resolve: {
					/** @ngInject */
					host_goods_gid: ($stateParams)=> {
						return parseInt($stateParams.gid, 10);
					},
					/** @ngInject */
					queuingGoods: (goodsService, $stateParams)=> {
						return goodsService
							.getQueue($stateParams.gid)
							.then(function(data) {
								return data;
							});
					},
				},
				/** @ngInject */
				onEnter: (goodsService, queuingGoods, host_goods_gid)=> {
					goodsService.showQueuingBox(null, queuingGoods, host_goods_gid);
				}
			}
		}
	];
}

