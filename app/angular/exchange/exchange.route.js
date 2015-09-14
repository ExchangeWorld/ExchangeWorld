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
				url : '/manage/:uid/exchange',
				bindToController: true,
				controller : 'ExchangeController',
				controllerAs: 'vm',
				templateUrl : 'exchange/exchange.html',
				resolve : {
					/** @ngInject */
					exchangeList : function (exchangeService, $stateParams) {
						return exchangeService
							.getAllExchange(parseInt($stateParams.uid, 10))
							.then(function(data) { return data; })
							.catch(function() { return []; });
					},
				},
			}
		}
	];
}
