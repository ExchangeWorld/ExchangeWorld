"use strict";

const coreModule = require('./core.module');
coreModule.config(RestConfig);

function RestConfig(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://140.119.164.169:3002/api');

	// set params for multiple methods at once
	// Restangular.setDefaultRequestParams(['remove', 'post'], {accessToken: "secret key"});
}
