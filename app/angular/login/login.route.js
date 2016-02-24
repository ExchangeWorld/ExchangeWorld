'use strict';

const loginModule = require('./login.module');
loginModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [{
		state: 'root.oneCol.login',
		config: {
			url: '/login',
			bindToController: true,
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'login/login.html',
		}
	}];
}
