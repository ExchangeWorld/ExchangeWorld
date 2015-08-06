'use strict';

const profileModule = require('./profile.module');
profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q) {
	var service = {
		getProfileData: asyncGetData 
	};

	return service;

	//////////

	function asyncGetData(fid) {
		var deferred = $q.defer();

		setTimeout(function() {
			/** 
			 * code for reject condictions 
			 */

			deferred.resolve(getProfileData(fid));
		}, 1000);

		return deferred.promise;
	}

	function getProfileData(id) {
		var profile = Restangular.all('api/profile');

		// GET /profile?fid=id
		return profile.getList({ 'fid':id }).then(function(data) {
			return data;
		}).catch(function(error) {
			console.log('error', error);
		});
	}
}
