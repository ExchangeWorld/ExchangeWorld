'use strict';

const facebookModule = require('./facebook.module');
const _              = require('lodash');

facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook, Restangular, $q, exception, $localStorage) {
	const service = {
		me,
		login,
		logout,
		register,
		getLoginStatus,
		getLargePicture,
	};

	return service;

	////////////////

	/**
	 * me()
	 * get user's facebook basic infomations 
	 * fields is an object like this:
	 * { fields: 'id, name, email, pictures' }
	 */
	function me(fields) {
		return Facebook.api('/me?', fields, function(response) {
			return response;
		});
	}

	/** Login */
	function login() {
		return Facebook.login(function(response) {
			if (response.status === 'connected') {
				return me();
			} else {
				console.error('FB login ERROR.');
				return {};
			}
		});
	}

	/** Logout */
	function logout() {
		return Facebook.logout();
	}

	/**
	 * me()
	 * get user's facebook basic infomations
	 * fields is an object like this:
	 * { fields: 'id, name, email, pictures' }
	 */
	function me(fields) {
		return Facebook.api('/me?', fields, function(response) {
			return response;
		});
	}

	function register(user) {
		const defer = $q.defer();

		Restangular
			.all('user')
			.getList({ fb_id: user.id })
			.then(function(data) {
				if (_.isArray(data)) {
					if (data.length === 0) {
						me({ fields: 'id, name, email, picture' })
							.then(function(user_data) {
								Restangular
									.all('user/register')
									.post({
										fb_id        : user_data.id,
										name         : user_data.name,
										photo_path   : user_data.picture.data.url,
										email        : user_data.email,
										//introduction : user_data.bio,
									})
									.then(function(data) {
										if (data) {
											defer.resolve(data);
											//$localStorage.fb_id = user_data.id;
											$localStorage.user = data;
										}
									})
									.catch(function(error) {
										return exception.catcher('[Facebook Service] register error: ')(error);
									});
							});
					} else {
						defer.resolve(data[0]);
						$localStorage.user = data[0];
						//console.log($localStorage);
					}
				}
			});
		return defer.promise;
	}

	function getLargePicture(fb_id) {
		console.log(fb_id);
		return Facebook.api('/'+fb_id+'/picture?width=100', function(response) {
			return response;
		});
	}

	/** get facebook login status */
	function getLoginStatus() {
		return Facebook.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				return true;
			} else {
				return false;
			}
		});
	}

}
