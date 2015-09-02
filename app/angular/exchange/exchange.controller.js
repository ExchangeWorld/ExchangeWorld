'use strict';

const exchangeModule = require('./exchange.module');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(exchangeList, $state, exchangeService) {
	var vm             = this;
	vm.exchangeList    = exchangeList;
	vm.exchange        = {};
	vm.onClickExchange = onClickExchange;


	activate();

	function activate() {
		onClickExchange(vm.exchangeList[0].eid);
	}

	////////////

	function onClickExchange(eid) {
		exchangeService
			.getExchange(eid)
			.then(function(data) {
				vm.exchange = data;
				console.log(vm.exchange.goods[0].name);
			});
		
	}
}
