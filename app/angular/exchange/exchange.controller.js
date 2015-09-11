'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(exchangeList, $state, exchangeService, $stateParams) {
	var vm             = this;
	vm.myid            = $stateParams.uid;
	vm.exchangeList    = exchangeList;
	vm.exchange        = {};
	vm.chatroom        = [];
	vm.chatContent     = '';
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;
	vm.onSubmitChat    = onSubmitChat;


	activate();

	function activate() {
		console.log(vm.myid);
		console.log(vm.exchangeList);
		if(vm.exchangeList.length) {
			vm.exchangeList.forEach(function(exchange) {
				exchangeService
					.getExchange(exchange.eid)
					.then(function(data) {
						//console.log(data);
						exchange.details = data;
						exchange.with = (data.goods[0].owner_uid === vm.myid) 
							? data.goods[0].user.name 
							: data.goods[1].user.name ;
					});
			});
			onClickExchange(vm.exchangeList[0].eid);
		}
	}

	function updateChat() {
		exchangeService
			.getChat(vm.exchange.eid, 100, 0)
			.then(function(data) {
				vm.chatroom = data;
			//})
			//.then(function() {
				//var chatroom = angular.element(document.querySelector('#chatroom'))[0];
				//console.log(chatroom );
				//chatroom.scrollTop =100;// chatroom.scrollHeight;
				//console.log(chatroom.scrollTop+' '+chatroom.scrollHeight );
			});
	}
	////////////

	function onClickExchange(eid) {
		exchangeService
			.getExchange(eid)
			.then(function(data) {
				//console.log(data);
				vm.exchange = data;
				updateChat();
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

	function onSubmitChat() {
		const chat = vm.chatContent.trim();
		if (chat) {
			const newChat = {
				eid        : vm.exchange.eid,
				sender_uid : vm.myid,
				content    : chat,
			};
			exchangeService
				.postChat(newChat)
				.then(function() {
					vm.chatContent = '';
					updateChat();
				});
		}
	}
}
