'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(
	exchangeList,
	$state,
	exchangeService,
	$stateParams,
	$interval,
	$mdDialog,
	$localStorage
) {
	var vm             = this;
	vm.goSeek          = ()=> $state.go('root.withSidenav.seek');
	vm.myid            = parseInt($stateParams.uid, 10);
	vm.myGoods         = {};
	vm.exchangeList    = exchangeList;
	vm.exchange        = {};
	vm.chatroom        = [];
	vm.chatContent     = '';
	vm.onClickGoods    = onClickGoods;
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;
	vm.onSubmitChat    = onSubmitChat;
	vm.agreed          = true;


	////////////
	activate();

	function activate() {
		if($stateParams.uid !== $localStorage.user.uid.toString()) {
			$state.go('root.withSidenav.404');
		} else {
			if(vm.exchangeList.length) {
				vm.exchangeList.forEach(function(exchange) {
					exchangeService
						.getExchange(exchange.eid)
						.then(function(data) {
							//console.log(data);
							vm.myGoods = (data.goods[0].owner_uid !== vm.myid) ? data.goods[0] : data.goods[1] ;
							exchange.details = data;
							exchange.with = (data.goods[0].owner_uid !== vm.myid)
								? data.goods[0].user.name
								: data.goods[1].user.name ;
						});
				});
				onClickExchange(vm.exchangeList[0].eid);
			}
		}
	}

	function onClickGoods(gid) {
		$state.go('root.withSidenav.goods', { gid : gid });
	}

	function updateChat() {
		exchangeService
			.getChat(vm.exchange.eid, 100, 0)
			.then(function(data) {
				vm.chatroom = data;
			});
	}

	var timer;
	function onClickExchange(eid) {
		$interval.cancel(timer);
		exchangeService
			.getExchange(eid)
			.then(function(data) {
				//console.log(data);
				vm.exchange = data;
				updateChat();
				agreed();
				timer = $interval(updateChat, 5000);
			});
	}

	function onClickComplete(ev) {
		exchangeService
			.showCompleteExchange(ev, vm.exchange, vm.myid)
			.then(function() {
				$state.go('root.withSidenav.seek');
			});
	}

	function onClickDelete(ev, eid) {
		var confirm = $mdDialog.confirm()
			.title('放棄這個交易')
			.content('您確定要放棄這個交易嗎？<br/>此動作無法回覆！')
			.ariaLabel('Delete Exchange')
			.ok('確定')
			.cancel('取消')
			.targetEvent(ev);
		if (confirm) {
			$mdDialog
				.show(confirm)
				.then(function() {
					exchangeService.deleteExchange(eid);
					$state.go('root.withSidenav.seek');
				});
		}
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

	function agreed() {
		if(vm.exchange.goods1_gid === vm.myGoods.gid) {
			if(vm.exchange.goods1_agree) vm.agreed = true;
		} else if(vm.exchange.goods2_gid === vm.myGoods.gid){
			if(vm.exchange.goods2_agree) vm.agreed = true;
		} else {
			vm.agreed = false;
		}
	}
}
