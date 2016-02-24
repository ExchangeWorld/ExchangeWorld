'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
const moment         = require('moment');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q, $mdDialog, exception) {
	var service = {
		getExchange,
		getExchanges,
		deleteExchange,
		agreeExchange,
		//completeExchange,
		showCompleteExchange,
		rating,

		getChat,
		postChat,
	};
	return service;

	async function getExchanges(ownerUid) {
		const defer = $q.defer();

		try {
			let exchanges = await Restangular.one('user', ownerUid).getList('exchange');
			defer.resolve(exchanges);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getExchange(ownerUid, eid) {
		const defer = $q.defer();

		try {
			let exchange = await Restangular.one('user', ownerUid).one('exchange', eid).get();

			try {
				exchange.other_goods.photoPath = JSON.parse(exchange.other_goods.photo_path);
				exchange.owner_goods.photoPath = JSON.parse(exchange.owner_goods.photo_path);
			} catch (err) {
				exchange.other_goods.photoPath = '';
				exchange.owner_goods.photoPath = '';
			}            
			defer.resolve(exchange);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function rating(goods, rate) {
		const defer = $q.defer();

		try {
			goods.route = `goods/${goods.gid}/rate`;
			goods.rate = rate;
			await goods.put();
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function agreeExchange(exchange) {
		const defer = $q.defer();

		try {
			exchange.route = `exchange/${exchange.eid}/agree`;
			await exchange.put();
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteExchange(exchange) {
		const defer = $q.defer();

		try {
			exchange.route = `exchange/${exchange.eid}/drop`;
			await exchange.put();
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function getChat(eid, number, offset) {
		const defer = $q.defer();

		Restangular
			.all('chatroom')
			.getList({
				eid    : eid,
				from   : offset,
				number : number,
			})
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(m) {
						m.time = moment(m.timestamp.slice(0, -1)).fromNow();
					});
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[Exchange Service] getChatroom error: ')(error);
			});
		return defer.promise;
	}

	function postChat(newChat) {
		const defer = $q.defer();

		Restangular
			.all('chatroom')
			.post({
				eid        : newChat.eid,
				sender_uid : newChat.sender_uid,
				content    : newChat.content,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] postChat error: ')(error);
			});
		return defer.promise;
	}

	function showCompleteExchange(ev, thisExchange, myid, callback) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'exchange/exchange.complete.html',
			controllerAs: 'vm',
			controller: onCompleteController,
			locals: {
				thisExchange: thisExchange,
				myid: myid,
			}
		});
		function onCompleteController($mdDialog, logger, exchangeService, thisExchange, myid) {
			const vm        = this;
			vm.thisExchange = thisExchange;
			vm.myuid        = parseInt(myid, 10);
			vm.mygid        = '';
			vm.othersgid    = '';
			vm.rating       = 3;
			vm.confirm      = onConfirm;
			vm.cancel       = onCancel;

			activate();

			function activate() {
				vm.mygid     = vm.thisExchange.details.goods[vm.thisExchange.lookupTable.me].gid;
				vm.othersgid = vm.thisExchange.details.goods[vm.thisExchange.lookupTable.other].gid;
			}


			function onConfirm(scores) {
				$mdDialog
					.hide(scores)
					.then(function(scores) {
						
						exchangeService
							.agreeExchange(thisExchange, vm.mygid)
							.then(function(data) {
								exchangeService.rating(vm.othersgid, scores);
								logger.success('成功評價此交易', data, 'DONE');
								callback();
							});
					});
			}
			function onCancel() {
				$mdDialog.cancel();
			}
		}
	
	}
}
