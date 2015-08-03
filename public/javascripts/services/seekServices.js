"use strict";

angular
	.module('seekServices', [])
	.factory('seekServ', seekserv);

function seekserv($http, $q) {
	var service = {
		getSeekData: getSeekData
	};

	return service;

	//////////


	function getSeekData() {
		/**
		 *  here should get search condition
		 *
		 */
		// the $http API is based on the deferred/promise APIs exposed by the $q service
		// it returns a promise by default
		return $http.get('/seek?title=')
			.then(function(response) {
				if (typeof response.data === 'object') {
					return response.data;
				} else {
					// invalid response
					return $q.reject(response.data);
				}

			}, function(response) {
				// something went wrong
				return $q.reject(response.data);
			});
	}
}
