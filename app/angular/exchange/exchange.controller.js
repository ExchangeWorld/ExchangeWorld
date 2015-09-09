'use strict';

const exchangeModule = require('./exchange.module');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(exchangeList, $state, exchangeService, $stateParams) {
	var vm             = this;
	vm.exchangeList    = exchangeList;
	vm.exchange        = {};
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;


	activate();

	function activate() {
			console.log(vm.exchangeList);
		if(vm.exchangeList.length) {
			vm.exchangeList.forEach(function(exchange) {
				exchangeService
					.getExchange(exchange.eid)
					.then(function(data) {
						//console.log(data);
						exchange.details = data;
						exchange.with = (data.goods[0].owner_uid === $stateParams.uid) ? data.goods[0].user.name : data.goods[1].user.name ;
					});
			});
			console.log(vm.exchangeList);
			onClickExchange(vm.exchangeList[0].eid);
		}
	}

	////////////

	function onClickExchange(eid) {
		exchangeService
			.getExchange(eid)
			.then(function(data) {
				//console.log(data);
				vm.exchange = data;
			});
	}

	function onClickComplete(eid) {
		exchangeService
			.completeExchange(eid)
			.then(function(data) {
				console.log(data);
				//$state.reload();
			});
	}

	function onClickDelete(eid) {
		exchangeService
			.deleteExchange(eid)
			.then(function(data) {
				console.log(data);
				//$state.reload();
			});
	}
}
