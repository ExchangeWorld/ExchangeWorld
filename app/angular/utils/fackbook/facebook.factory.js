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

	function register(user) {
		const defer = $q.defer();

		$q.
			all([
				Restangular.oneUrl(`user?identity=${user.id}`).get(),
				getLargePicture(user.id)
			])
			.then(function(results) {
				//console.log(results);
				var member = results[0];
				var largePic = results[1];

				if (!member) {
					me({ fields: 'id, name, email, picture' })
						.then(function(user_data) {

							Restangular
								.all('authenticate/register')
								.post({
									fb         : true,
									identity   : user_data.id,
									name       : user_data.name,
									photo_path : largePic.data.url,
									email      : user_data.email,
								})
								.then(function(data) {
									if (data) {
										defer.resolve(data);
										$localStorage.user = data;
									}
								}, (error)=> {
									return exception.catcher('[Facebook Service] register error: ')(error);
								});
						});
				} else {
					member.route = 'user/photo';
					member.photo_path = largePic.data.url;
					member.put();

					Restangular
						.all('authenticate/login')
						.post({
							fb       : true,
							identity : member.identity
						})
						.then(function(token) {
							member.token = token.token;
							defer.resolve(member);
							$localStorage.user = member;
						});
				}
			});
		return defer.promise;
	}

	function getLargePicture(fb_id) {
		return Facebook.api('/'+fb_id+'/picture?width=320&height=320', function(response) {
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
