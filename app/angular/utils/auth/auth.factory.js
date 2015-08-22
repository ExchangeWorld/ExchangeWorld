'use strict';

const authModule = require('./auth.module');
const _          = require('lodash');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q, $localStorage) {
	var token       = '';
	var currentUser = {};

	const service = {
		init,
		login,
		logout,
		fetchMe,
		isLoggedIn,
		getLoginState,
		currentUser : () => currentUser,
	};
	return service;

	/////////////

	function init() {
		const defer = $q.defer();

		//console.log($localStorage);
		if($localStorage.user !== undefined) {
			currentUser = $localStorage.user;
			defer.resolve($localStorage.user);
		}
		else {
			getLoginState()
				.then(function(data) {
					currentUser = data;
					defer.resolve(data);
				});
		}
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
		console.log('localStorage clear! ');
		console.log($localStorage);
		delete $localStorage.user;
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
		return !(_.isEmpty(currentUser));
	}

	function getLoginState() {
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
				} else { 
					console.log('not logged in');
					currentUser = {};
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
