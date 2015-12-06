"use strict";

const coreModule = require('./core.module');
coreModule.config(RestConfig);

function RestConfig(RestangularProvider) {
	//RestangularProvider.setBaseUrl('api');
	RestangularProvider.setBaseUrl('http://exwd.csie.org:43001/api');

	// set params for multiple methods at once
	// Restangular.setDefaultRequestParams(['remove', 'post'], {accessToken: "secret key"});
}
