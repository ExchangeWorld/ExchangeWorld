"use strict";

const coreModule = require('./core.module');
coreModule.config(RestConfig);

function RestConfig(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://192.168.43.56:3002/api');

	// set params for multiple methods at once
	// Restangular.setDefaultRequestParams(['remove', 'post'], {accessToken: "secret key"});
}
