'use strict';

const facebookModule = require('./facebook.module');
facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook) {
	const service = {
		login          : login,
		logout         : logout,
		me             : me,
		//intentLogin    : intentLogin,
		//getLoginStatus : getLoginStatus,
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
		})
	}

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

	/**
	function getLoginStatus() {
		var FBstatus = false;
		Facebook.getLoginStatus(function(response) {
			if (response.status == 'connected') {
				//resolve.data()
				FBstatus = true;
			} else { 
				FBstatus = false;
			} 
		});
	}
	*/

	/**
	 * IntentLogin, check if is loggin.
	 * if already loggin, do nothings.
	function intentLogin() {
		if (getLoginStatus()) {
			return me();
		} else {
			return login(); 
		}
	}
	 */

}
