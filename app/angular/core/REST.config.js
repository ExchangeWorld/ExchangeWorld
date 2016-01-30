"use strict";

const coreModule = require('./core.module');
coreModule.run(RestConfig);

/** ngInject */
function RestConfig(Restangular, $localStorage) {
	//RestangularProvider.setBaseUrl('api');
	Restangular.setBaseUrl('http://exwd.csie.org:43002/api');

	// token will expire if idle 20min
	Restangular.setDefaultRequestParams(['remove', 'post', 'put', 'delete'], {token: $localStorage.user.token});
}
