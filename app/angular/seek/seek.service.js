'use strict';

const seekModule = require('./seek.module');
const _          = require('lodash');

seekModule.factory('seekService', seekService);

/** @ngInject */
function seekService(Restangular, $q, exception) {
	var service = {
		getSeek: getSeek,
	};

	return service;

	//////////

	function getSeek(filter) {
		const defer = $q.defer();

		Restangular
			.all('goods/search')
			.getList(filter)
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(goods) {
						if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
					});
					defer.resolve(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[Seek Service] getSeek error: ')(error);
			});
		return defer.promise;
	}
}
