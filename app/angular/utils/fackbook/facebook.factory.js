'use strict';

const facebookModule = require('./facebook.module');
const _          = require('lodash');

facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook, Restangular, $q, exception) {
	const service = {
		login    : login,
		logout   : logout,
		me       : me,
		register : register,
	};

	return service;

	////////////////

	/**
	 * Login
	 */
	function login() {
		//var user = {};
		return Facebook.login(function(response) {
			if (response.status === 'connected') {
				return me();
			} else {
				console.error('FB login ERROR.');
				return {};
			}
		});
	}

	/**
	 * Logout
	 */
	function logout() {
		return Facebook.logout();
	}

	/**
	 * me
	 * get user's facebook basic infomations 
	 */
	function me() {
		return Facebook.api('/me', function(response) {
			return response;
		});
	}

	function register(user_data) {
		const defer = $q.defer();

		var newUser = {
			fb_id      : user_data.id,
			name       : user_data.first_name,
			photo_path : '',
			email      : user_data.email,
		};

		Restangular
			.all('user/')
			.getList({fb_id: newUser.fb_id})
			.then(function(data) {
				if(_.isArray(data)){
					if(data.length === 0) {
						Restangular
							.all('user/register')
							.post(newUser)
							.then(function(data){
								if (data !== undefined ) {
									defer.resolve(data);
								} 
							})
							.catch(function(error) {
								return exception.catcher('[Facebook Service] register error: ')(error);
							});
					} else {
						//console.log(data[0]);
						defer.resolve(data[0]);
					}
				}
			});

		return defer.promise;
	}

}
