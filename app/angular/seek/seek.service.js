'use strict';

const seekModule = require('./seek.module');

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
				data.forEach(function(goods) {
					try {
						goods.photo_path = JSON.parse(goods.photo_path);
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
