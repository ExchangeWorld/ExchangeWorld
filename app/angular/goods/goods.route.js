'use strict';

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
					goodData : function (goodsService, $stateParams) {
						return goodsService
							.getGood($stateParams.gid)
							.then(function(data) { return data; })
							.catch(function() { return undefined; });
					},
				},
			}
		}
	];
}
