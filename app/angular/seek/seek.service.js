'use strict';

const seekModule = require('./seek.module');
seekModule.service('seekServ', seekService);

/** @ngInject */
function seekService(Restangular) {
	var service = {
		getSeekData: getSeekData
	};

	return service;

	//////////

	function getSeekData() {
		var seek = Restangular.all('api/seek');

		/**
		 *  here should get search condition
		 *  i.e. title, category, and so on
		 */
		return seek.getList({'title': ''}).then(function(data) {
			return data;
		}, function(error) {
			console.log('error', error);
		});
	}
}
