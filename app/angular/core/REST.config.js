"use strict";

const coreModule = require('./core.module');
coreModule.run(RestConfig);

/** ngInject */
function RestConfig(Restangular, $localStorage) {
	//RestangularProvider.setBaseUrl('api');
	Restangular.setBaseUrl('http://exwd.csie.org:43002/api');
	Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'put', 'delete'], {token: $localStorage.user.token});

	// set params for multiple methods at once
	// Restangular.setDefaultRequestParams(['remove', 'post'], {accessToken: "secret key"});
}
