'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
//goodsModule.service('goodsService', goodsService);

goodsModule.factory('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q, exception) {

	const service = {
		getGood : getGood,
		editGood : updateGood,
	};
	return service;


	function getGood(gid) {
		const defer = $q.defer();

		Restangular
			.all('goods')
			.getList({ gid : gid })
			//.one('goods', gid)
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data[0]);
				} else if (_.isObject(data)) {
					defer.resolve(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] getGood error: ')(error);
			});
		//.finally();
		return defer.promise;
	}

	function updateGood() {

		return ;
	}
}
