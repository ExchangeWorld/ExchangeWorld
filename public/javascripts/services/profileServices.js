"use strict";

angular
	.module('profileServices', [])
	.factory('profileServ', profileserv);

function profileserv(Restangular) {
	var service = {
		getProfileData: getProfileData
	};

	return service;

	////////////

	function getProfileData(id) {
		var profile = Restangular.all('profile');

		// GET /profile?fb_id=id
		return profile.getList({'fb_id': id}).then(function(data) {
			return data;
		}, function(error) {
			console.log('error', error);
		});
	}
}
