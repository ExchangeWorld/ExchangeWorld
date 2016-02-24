'use strict';

const signupModule = require('./signup.module');
signupModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [{
		state: 'root.oneCol.signup',
		config: {
			url: '/signup',
			bindToController: true,
			controller: 'SignupController',
			controllerAs: 'vm',
			templateUrl: 'signup/signup.html',
		}
	}];
}
