'use strict';

const exchangeModule = require('./exchange.module');
exchangeModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.oneCol.exchange',
			config : {
				url : '/manage/exchange',
				bindToController: true,
				controller : 'ExchangeController',
				controllerAs: 'vm',
				templateUrl : 'exchange/exchange.html',
				resolve : {
					exchange : function (exchangeService, $stateParams) {
						return ;
					},
				},
			}
		}
	];
}
