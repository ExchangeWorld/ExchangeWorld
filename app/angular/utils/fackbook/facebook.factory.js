'use strict';

const facebookModule = require('./facebook.module');
facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook) {
	const service = {
		login          : login,
		logout         : logout,
		me             : me,
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

}
