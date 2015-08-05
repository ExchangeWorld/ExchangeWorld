"use strict";

const layoutModule = require('./layout.module');
layoutModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'Home',
			config : {
				url : '/',
				templateUrl : 'layout/layout.html',
			}
		}
	];
}