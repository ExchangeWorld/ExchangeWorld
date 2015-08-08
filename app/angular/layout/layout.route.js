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
			state : 'root',
			config : {
				abstract : true,
				templateUrl : 'layout/layout.html',
			}
		}
	];
}
