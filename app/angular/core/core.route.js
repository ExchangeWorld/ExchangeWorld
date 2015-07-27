"use strict";

const coreModule = require('./core.module');
coreModule
	.run(appRun);

/** @ngInject */
function appRun(routerHelper, $rootScope, AppSettings) {
	routerHelper.configureStates(getStates(), '/404');

	$rootScope.pageTitle = AppSettings.appTitle;
}

function getStates() {
	return [
		{
			state: '404',
			config: {
				url: '/404',
				templateUrl: 'core/404.html',
				title: '404'
			}
		}
	];
}