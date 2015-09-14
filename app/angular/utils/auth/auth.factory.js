'use strict';

const authModule = require('./auth.module');
const _          = require('lodash');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q, $localStorage) {
	var token       = '';
	var currentUser = null;

	const service = {
		login,
		logout,
		fetchMe,
		isLoggedIn,
		getLoginState,
		currentUser : () => currentUser,
	};
	return service;

	/////////////

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
		const defer = $q.defer();
		facebookService
			.logout()
			.then(function() {
				currentUser = null;
				delete $localStorage.user;
				defer.resolve();
			});
		return defer.promise;
	}

	function fetchMe() {
		const defer = $q.defer();
		facebookService
			.me({ fields: 'id' }) // get user facebook id.
			.then(function(response) {
				/** Call API for create/get new EXWD user. */
				facebookService
					.register(response)
					.then(function(userdata) {
						currentUser = userdata;
						defer.resolve(currentUser);
					});
			});
		return defer.promise;
	}

	function isLoggedIn() {
		return Boolean(currentUser);
	}

	function getLoginState() {
		const defer = $q.defer();
		facebookService
			.getLoginStatus()
			.then(function(state) {
				if(state.status === 'connected') {
					fetchMe().then(function(data) {
						currentUser = data;
						defer.resolve(currentUser);
					});
				} else {
					console.log('not logged in');
					currentUser = null;
					defer.resolve(currentUser);
				}
			});
		return defer.promise;
	}

	function generateAccessToken() {

	}

	function getAccessToken() {
		return token;
	}

}
