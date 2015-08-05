'use strict';

const seekModule = require('./seek.module');
seekModule.service('seekService', seekService);

/** @ngInject */
function seekService(Restangular, $q) {
	var service = {
		getSeekData: asyncGetData 
	};

	return service;

	//////////

	function asyncGetData(data) {
		var deferred = $q.defer();

		setTimeout(function() {
			/** 
			 * code for reject condictions 
			 */

			deferred.resolve(getSeekData());
		}, 1000);

		return deferred.promise;
	}

	function getSeekData() {
		var seek = Restangular.all('api/seek');

		/**
		 *  here should get search condition
		 *  i.e. title, category, and so on
		 */
		return seek.getList({ 'title': '' }).then(function(data) {
			return data;
		}).catch(function(error) {
			console.log('error', error);
		});
	}
}
