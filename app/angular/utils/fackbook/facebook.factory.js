'use strict';

const facebookModule = require('./facebook.module');
facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook) {
	const service = {
		intentLogin    : intentLogin,
		login          : login,
		logout         : logout,
		getLoginStatus : getLoginStatus,
		me             : me,
	};

	return service;

	/**
	 * Watch for Facebook to be ready.
	 * Thereks also the event that could be used
	$scope.watch(
		function() {
			return Facebook.isReady();
		},
		function(newVal) {
			if (newVal)
				vm.facebookReady = true;
		}
	);
	 */


	function getLoginStatus(){
		return Facebook.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				return true;
			} else {
				return false;
			}
		});
	}

	/**
	 * IntentLogin, check if is loggin.
	 * if already loggin, do nothings.
	 */
	function intentLogin() {
		if (getLoginStatus()) {
			return me();
		} else {
			return login(); 
		}
	}

	/**
	 * Login
	 */
	function login() {
		return Facebook.login(function(response) {
			if (response.status === 'connected') {
				return me();
			}
		});
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

	/**
	 * Logout
	 */
	function logout() {
		return Facebook.logout(function() {
			return {};
		});
	}

}
