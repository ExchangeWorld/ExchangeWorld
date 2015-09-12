'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q, $mdDialog) {
	var service = {
		getExchange,
		getAllExchange,
		deleteExchange,
		//completeExchange,
		showCompleteExchange,

		getChat,
		postChat,
	};
	return service;

	/** get exchange data */
	function getAllExchange(owner_uid) {
		const defer = $q.defer();

		Restangular
			.all('exchange/allExchange')
			.getList()
			.then(function(data) {
				if (_.isArray(data)) {
					
					Restangular
						.all('goods')
						.getList({ owner_uid : owner_uid })
						.then(function(goods_data) {
							if (_.isArray(goods_data)) {
								var filtered = data.filter(function(exchange) {
									if( 
										_.findWhere(goods_data, { gid: exchange.goods1_gid}) || 
										_.findWhere(goods_data, { gid: exchange.goods2_gid}) 
									) {
										return true;
									} else {
										return false;
									}
								});
								console.log(filtered);
								defer.resolve(filtered);
							}
						})
						.catch(function(error) {
							return exception.catcher('[Exchange Service] getGood error: ')(error);
						});

				}
			})
			.catch(function(error) {
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
				console.log(data);
				data = _.isArray(data) ? data[0] : data;
				data.goods.forEach(function(goods) {
					if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
				});
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] getExchange error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * complete exchange
	 * users all accept the exchage.
	 */
	function completeExchange(eid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				if (_.isArray(data)) {
					var exchange = data[0];
					exchange.route += '/complete'; // PUT of "complete" is "api/exchange/complete"
					//console.log(exchange);
					exchange.put();
				}
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] completeExchange error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * drop exchange
	 * one of the user reject the exchage.
	 */
	function deleteExchange(eid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				if (_.isArray(data)) {
					var exchange = data[0];
					exchange.route += '/drop'; // PUT of "drop" is "api/exchange/drop"
					//console.log(exchange);
					exchange.put();
				}
			})
			.catch(function(error) {
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
				//console.log(data);
				defer.resolve(data);
			})
			.catch(function(error) {
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

	function showCompleteExchange(ev) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'exchange/exchange.complete.html',
			controllerAs: 'vm',
			controller: onCompleteController,
			//locals: {
			//}
		});
		function onCompleteController($mdDialog, logger) {
			const vm          = this;
			//vm.queuingGoods   = queuingGoods;
			//vm.host_goods_gid = host_goods_gid;
			vm.confirm        = onConfirm;
			vm.cancel         = onCancel;

			function onConfirm(selected_gid) {
				$mdDialog
					.hide(selected_gid)
					.then(function(selected_gid) {
						//postExchange(selected_gid, host_goods_gid)
							//.then(function(data) {
								//logger.success('成功接受一個排', data, 'DONE');
							//});
					});
			}
			function onCancel() {
				$mdDialog.cancel();
			};
		}
	
	}
}
