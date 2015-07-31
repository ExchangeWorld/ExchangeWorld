"use strict";

angular
	.module('profileServices', [])
	.factory('profileServ', profileserv);

function profileserv($http) {
	var service = {
		get: getProfileData
	};

	return service;

	////////////

	function getProfileData(callback, id) {
		$http.get('/profile?fb_id=' + id).success(function(data) {
			// prepare data here
			//console.log(data);
			callback(data);
		});
	}
}
