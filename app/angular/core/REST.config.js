"use strict";

const coreModule = require('./core.module');
coreModule.run(RestConfig);

/** ngInject */
function RestConfig(Restangular, $localStorage) {
	//RestangularProvider.setBaseUrl('api');
	Restangular.setBaseUrl('http://dream.cs.nccu.edu.tw:43002/api');

	// token will expire if idle 20min
	Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'put', 'delete'], {token: $localStorage.token});
}
