'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(
	exchangeList,
	mapSize,
	$state,
	$timeout,
	$rootScope,
	exchangeService,
	colorThief,
	$stateParams,
	$interval,
	$mdDialog,
	$window,
	$localStorage,
	$q,
	$mdSidenav,
	$scope
) {
	var vm             = this;
	var ct             = new colorThief.ColorThief();
	vm.goSeek          = ()=> $state.go('root.withSidenav.seek');
	vm.myid            = parseInt($stateParams.uid, 10);
	vm.exchangeList    = exchangeList;
	vm.exchange        = undefined;
	vm.chatroom        = [];
	vm.loadMore        = loadMore;
	vm.chatContent     = '';
	vm.onClickGoods    = (gid)=> $state.go('root.withSidenav.goods', { gid : gid });
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;
	vm.onSubmitChat    = onSubmitChat;
	vm.agreed          = false;
	vm.map             = { size: mapSize };

	////////////
	activate();
	
	var amount, offset;
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
			.getChat(vm.exchange.eid, amount+offset, 0)
			.then((data)=> { vm.chatroom = data.reverse(); });
	}

	function loadMore() {
		var deferred = $q.defer();
		offset += amount;

		exchangeService
			.getChat(vm.exchange.eid, amount, offset)
			.then((data)=> { 
				vm.chatroom = [...data.reverse(), ...vm.chatroom];

				deferred.resolve();
			});

		return deferred.promise;
	}

	function onClickExchange(index) {
		amount = 20;
		offset = 0;
		vm.exchange = vm.exchangeList[index];
		updateChat();
		agreed();
		
		dominateColor(vm.exchange.details.goods[vm.exchange.lookupTable.other], 'other');
		dominateColor(vm.exchange.details.goods[vm.exchange.lookupTable.me], 'me');

		vm.map.marker = `${vm.exchange.details.goods[vm.exchange.lookupTable.other].position_y},${vm.exchange.details.goods[vm.exchange.lookupTable.other].position_x}`;
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
			.content('您確定要放棄這個交易嗎？<br/>此動作無法恢復！')
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
	
	function dominateColor(goods, who) {
		console.log(goods);
		var image = document.getElementById(`img_${who}`);
		image.onload = ()=> {
			var pallete = ct.getPalette(image, 2);
			goods.bgStyle = {
				"background-color": `rgb(${pallete[0][0]}, ${pallete[0][1]}, ${pallete[0][2]})`,
				"border-radius": "20px",
				"margin": "0"
			};
			goods.fontcolor = [{
				"color": `rgb(${pallete[1][0]}, ${pallete[1][1]}, ${pallete[1][2]})`
			},{
				"color": `rgb(${pallete[2][0]}, ${pallete[2][1]}, ${pallete[2][2]})`
			}];
		};
	}

	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};

	$scope.openRightMenu = function() {
		$mdSidenav('right').toggle();
	};

	$scope.closeleft = function () {
		$mdSidenav('left').close();
	};

	$scope.closeright = function () {
		$mdSidenav('right').close();
	};
}
