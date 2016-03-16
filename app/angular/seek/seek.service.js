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

	async function getSeek(filter) {
		const defer = $q.defer();

		try {
			let goods = await Restangular.all('goods').getList(filter);

			goods.forEach(function(g) {
				try {
					g.photo_path = JSON.parse(g.photo_path);
					g.cate_alias = _.result(_.find(AvailableCategory, { 'label': g.category }), 'alias');
				} catch (err) {
					g.photo_path = '';
				}
			});

			defer.resolve(goods);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	
}
