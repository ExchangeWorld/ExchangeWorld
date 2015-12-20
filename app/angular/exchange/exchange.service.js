/* global byuserGen */

'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');
const moment         = require('moment');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q, $mdDialog, exception) {
	var service = {
		getExchange,
		getAllExchange,
		deleteExchange,
		agreeExchange,
		completeExchange,
		showCompleteExchange,
		rating,

		getChat,
		postChat,
	};
	return service;

	/** get exchange data */
	function getAllExchange(owner_uid) {
		const defer = $q.defer();

		Restangular
			.all('exchange/of')
			.getList({
				owner_uid: owner_uid
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[Exchange Service] getAllExchange error: ')(error);
			});
		return defer.promise;
	}

	function getExchange(eid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				data = _.isArray(data) ? data[0] : data;
				data.goods.forEach(function(goods) {
					if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
				});
				defer.resolve(data);
			}, (error)=> {
				return exception.catcher('[Exchange Service] getExchange error: ')(error);
			});
		return defer.promise;
	}

	function rating(gid, rate) {
		const defer = $q.defer();

		Restangular
			.all('goods')
			.getList({gid: gid})
			.then(function(data) {
				if(_.isArray(data)) {
					data[0].route = 'goods/rate';
					data[0].rate = rate;
					data[0].byuser = byuserGen(data[0].owner_uid); 
					data[0].put();
				}
			}, (error)=> {
				return exception.catcher('[Exchange Service] rating error: ')(error);
			});
		return defer.promise;
	}

	function agreeExchange(exchange, gid) {
		const defer = $q.defer();

		exchange.route = 'exchange/agree';
		exchange.goods_gid = (gid === exchange.goods1_gid) 
			? exchange.goods1_gid 
			: exchange.goods2_gid;

		exchange.agree = 'true';

		exchange
			.put()
			.then(function(data) {
				defer.resolve(data);
				if (
					data.goods1_agree && 
					data.goods2_agree
				) {
					completeExchange(exchange);
				}
			})
			.catch(function(error) {
				return exception.catcher('[exchange Service] agreeExchange error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * complete exchange
	 */
	function completeExchange(exchange) {
		const defer = $q.defer();

		exchange.route = 'exchange/complete'; // PUT of "complete" is "api/exchange/complete"

		exchange
			.put()
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[exchange Service] completeExchange error: ')(error);
			});

		return defer.promise;
	}

	/**
	 * drop exchange
	 * one of the user reject the exchage.
	 */
	function deleteExchange(eid, uid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				if (_.isArray(data)) {
					var exchange = data[0];
					exchange.byuser = byuserGen(uid);
					exchange.route = 'exchange/drop'; // PUT of "drop" is "api/exchange/drop"
					exchange.put();
				}
			}, (error)=> {
				return exception.catcher('[Exchange Service] deleteExchange error: ')(error);
			});
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
		function onCompleteController($mdDialog, logger, exchangeService, thisExchange, myid, $state) {
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
