'use strict';

const goodsModule = require('./goods.module');
goodsModule.service('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q) {
	var service = {
		getGoodsData : asyncGetData
	};

	return service;

	//////////

	function asyncGetData(gid) {
		var deferred = $q.defer();

		setTimeout(function() {
			/**
			 * code for reject condictions
			 */

			deferred.resolve(getGoodsData(gid));
		}, 1000);

		return deferred.promise;
	}

	function getGoodsData(id) {
		var goods = Restangular.all('api/goods');

		// GET /goods?gid=id
		return goods
			.getList({ 'gid' : id })
			.then(function(data) {
				return data;
			})
			.catch(function(error) {
				console.log('error', error);
			});
	}
}
