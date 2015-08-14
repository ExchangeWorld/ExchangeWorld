'use strict';

const authModule = require('./auth.module');
const _          = require('lodash');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q) {
	var token       = '';
	var currentUser = {};

	const service = {
		init        : init,
		login       : login,
		logout      : logout,
		isLoggedIn  : isLoggedIn,
		currentUser : function() { return currentUser; },
		fetchMe     : fetchMe,
		getToken    : getAccessToken,
		updateToken : generateAccessToken,
	};
	return service;

	function init() {
		const defer = $q.defer();
		facebookService
			.getLoginStatus()
			.then(function(state) {
				if(state.status == 'connected') {
					fetchMe()
						.then(function(data) { 
							currentUser = data;
							defer.resolve(data);
						});
				}
			});
		return defer.promise;
	}

	function login() {
		const defer = $q.defer();

		facebookService
			.login() // login to facebook.
			.then(function(loginStatus) {
				fetchMe()
					.then(function(data) {
						currentUser = data;
						defer.resolve(data);
					});
			});
		return defer.promise;
	}

	function logout() {
		facebookService.logout();
		currentUser = {};
	}

	function isLoggedIn() {
		//console.log(currentUser);
		return !(_.isEmpty(currentUser));
	}

	function fetchMe() {
		const defer = $q.defer();
		facebookService
			.me() // get user facebook data.
			.then(function(response) {
				/** Call API for create/get new EXWD user. */
				facebookService
					.register(response)
					.then(function(userdata) {
						//console.log(userdata);
						currentUser = userdata;
						defer.resolve(currentUser);
					});
			});
		return defer.promise;
	}

	function generateAccessToken() {

	}

	function getAccessToken() {
		return token;
	}

}
