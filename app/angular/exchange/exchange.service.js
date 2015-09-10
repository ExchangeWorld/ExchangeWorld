'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q) {
	var service = {
		getExchange,
		getAllExchange,
		deleteExchange,
		completeExchange,

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

	/**
	 * eid is the chatroom id(same as exchange id)
	 */
	function getChat(eid) {
		return;
	}

	function postChat(eid, chat) {
		return;
	}
}
