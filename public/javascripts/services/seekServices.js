"use strict";

angular
	.module('seekServices', [])
	.factory('seekServ', seekserv);

function seekserv(Restangular) {
	var service = {
		getSeekData: getSeekData
	};

	return service;

	//////////


	function getSeekData() {
		var seek = Restangular.all('seek');

		/**
		 *  here should get search condition
		 *  i.e. title, category, and so on
		 */
		return seek.getList({'title':''}).then(function(data) {
			return data;
		}, function(error) {
			console.log('error', error);
		});
	}
}
