'use strict';

const seekModule = require('./seek.module');
const _ = require('lodash');

seekModule.factory('seekService', seekService);

/** @ngInject */
function seekService(Restangular, $q, exception, AvailableCategory) {
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
				data.forEach(function(goods) {
					try {
						goods.photo_path = JSON.parse(goods.photo_path);
						goods.cate_alias = _.result(_.find(AvailableCategory, { 'label': goods.category }), 'alias');
					} catch (err) {
						goods.photo_path = '';
					}
				});

				defer.resolve(data);
			}, (error)=> {
				return exception.catcher('[Seek Service] getSeek error: ')(error);
			});
		return defer.promise;
	}

	
}
