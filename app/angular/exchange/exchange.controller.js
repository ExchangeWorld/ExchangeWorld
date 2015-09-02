'use strict';

const exchangeModule = require('./exchange.module');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(exchangeList, $state, exchangeService) {
	var vm             = this;
	vm.exchangeList    = exchangeList;
	vm.exchange        = {};
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;


	activate();

	function activate() {
		if(vm.exchangeList.length) {
			onClickExchange(vm.exchangeList[0].eid);
		}
	}

	////////////

	function onClickExchange(eid) {
		exchangeService
			.getExchange(eid)
			.then(function(data) {
				vm.exchange = data;
			});
	}
	function onClickComplete(eid) {
		exchangeService
			.completeExchange(eid)
			.then(function(data) {
				console.log(data);
			});
	}
}
