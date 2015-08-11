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

	function getSeek() {
		const defer = $q.defer();

		Restangular
			.all('seek')
			/**
			 *  here should have search condition
			 *  i.e. title, category, and so on
			 */
			.getList()
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				} 
			})
			.catch(function(error) {
				return exception.catcher('[Seek Service] getSeek error: ')(error);
			});
		return defer.promise;
	}
}
