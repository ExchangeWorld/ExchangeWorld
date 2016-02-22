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
				title : 'exchange',
				url : '/manage/:uid/exchange',
				bindToController: true,
				controller : 'ExchangeController',
				controllerAs: 'vm',
				templateUrl : 'exchange/exchange.html',
				resolve : {
					/** @ngInject */
					exchangeList : function (exchangeService, $stateParams) {
						return exchangeService
							.getExchanges(parseInt($stateParams.uid, 10))
							.then(function(data) { return data; })
							.catch(function() { return []; });
					},
					/** @ngInject */
					mapSize: function($window) {
						if($window.innerWidth > 960) {
							return `${parseInt($window.innerWidth*0.25, 10)}x${parseInt(($window.innerHeight-56)*0.3, 10)}`;
						} else {
							return `${parseInt($window.innerWidth, 10)}x200`;
						}
					}
				},
			}
		}
	];
}
