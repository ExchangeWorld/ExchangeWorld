"use strict";

angular
	.module('profileServices', [])
	.factory('profileServ', profileserv);

function profileserv($http) {
	var service = {
		getProfileData: getProfileData
	};

	return service;

	////////////

	function getProfileData(id) {
		return $http.get('/profile?fb_id=' + id)
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
