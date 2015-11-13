'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(
	exchangeList,
	$state,
	$timeout,
	$rootScope,
	exchangeService,
	$stateParams,
	$interval,
	$mdDialog,
	$localStorage
) {
	var vm             = this;
	vm.goSeek          = ()=> $state.go('root.withSidenav.seek');
	vm.myid            = parseInt($stateParams.uid, 10);
	vm.exchangeList    = exchangeList;
	vm.exchange        = undefined;
	vm.chatroom        = [];
	vm.chatContent     = '';
	vm.onClickGoods    = (gid)=> $state.go('root.withSidenav.goods', { gid : gid });
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;
	vm.onSubmitChat    = onSubmitChat;
	vm.agreed          = false;


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
							exchange.details = data;
							exchange.lookupTable = {
								me   : data.goods[0].owner_uid === vm.myid ? 0 : 1,
								other: data.goods[1].owner_uid === vm.myid ? 0 : 1,
							};
						});
				});
				// agreed();
			}
		}
	}

	var timer;
	timer = $interval(updateChat, 5000);
	function updateChat() {
		if(!vm.exchange) return;
		exchangeService
			.getChat(vm.exchange.eid, 100, 0)
			.then((data)=> { vm.chatroom = data; });
	}

	function onClickExchange(index) {
		vm.exchange = vm.exchangeList[index];
		updateChat();
		agreed();
		
		$rootScope.$broadcast('goodsChanged', [vm.exchange.details.goods[vm.exchange.lookupTable.other]]);
		$rootScope.$broadcast('mapMoveTo', vm.exchange.details.goods[vm.exchange.lookupTable.other].gid);
		$timeout(()=> {
			$rootScope.$broadcast('goodsChanged', [vm.exchange.details.goods[vm.exchange.lookupTable.other]]);
			$rootScope.$broadcast('mapMoveTo', vm.exchange.details.goods[vm.exchange.lookupTable.other].gid);
		}, 50);
	}

	function onClickComplete(ev) {
		exchangeService
			.showCompleteExchange(ev, vm.exchange, vm.myid, ()=> { 
				$state.reload();
			});
		//agreed();
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
					$state.reload();
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
		if(vm.exchange.goods1_gid === vm.exchange.details.goods[vm.exchange.lookupTable.me].gid) {
			vm.agreed = vm.exchange.goods1_agree ? true : false;
		} else if(vm.exchange.goods2_gid === vm.exchange.details.goods[vm.exchange.lookupTable.me].gid){
			vm.agreed = vm.exchange.goods2_agree ? true : false;
		} else {
			vm.agreed = false;
		}
	}
}
