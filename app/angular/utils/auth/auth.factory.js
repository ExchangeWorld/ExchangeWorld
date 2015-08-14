'use strict';

const authModule = require('./auth.module');
const _          = require('lodash');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q) {
	var token       = '';
	var currentUser = {name : 'kkk'};

	const service = {
		login       : login, 
		logout      : logout,
		isLoggedIn  : isLoggedIn,
		currentUser : function() { return currentUser; },
		getToken    : getAccessToken,
		updateToken : generateAccessToken,
	};
	return service;


	function login() {
		const defer = $q.defer();

		facebookService
			.getLoginStatus()
			.then(function(state) {
				//console.log(state.status);
				if(state.status == 'connected') {
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
				} else {
					facebookService
						.login() // login to facebook.
						.then(function(loginStatus) {
							facebookService
								.me() // get user facebook data.
								.then(function(response) {
									/** Call API for create/get new EXWD user. */
									facebookService
										.register(response)
										.then(function(userdata) {
											console.log(userdata);
											currentUser = userdata;
											defer.resolve(currentUser);
										});
								});
						});
				}
			});
		return defer.promise;
	}

	function logout() {
		facebookService.logout();
		currentUser = {};
	}

	function isLoggedIn() {
		//console.log(!(_.isEmpty(currentUser)));
		return !(_.isEmpty(currentUser));
	}

	function generateAccessToken() {

	}

	function getAccessToken() {
		return token;
	}

}
