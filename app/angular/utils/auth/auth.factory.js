"use strict";

const authModule = require('./auth.module');
authModule.provider('auth', auth);

/** @ngInject */
function auth() {

	var token;
	const service = {
		getToken : getAccessToken,
		updateToken : generateAccessToken
	};
	return service;


	function generateAccessToken() {

	}

	function getAccessToken() {
		return token;
	}

}