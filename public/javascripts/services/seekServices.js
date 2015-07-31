"use strict";

angular
	.module('seekServices', [])
	.factory('seekServ', seekserv);

function seekserv($http) {
	var service = {
		get: getSeekData
	};

	return service;

	//////////

	/**
	 *  here should get search condition
	 *
	 */
	function getSeekData(callback) {
		$http.get('/seek?title=').success(function(data) {
			// prepare data here
			callback(data);
		});
	}
}
