"use strict";

const coreModule = require('./core.module');
coreModule
	.run(appRun)
	.run(OnRun);

/** @ngInject */
function appRun(routerHelper) {
	var otherwise = '/404';
	routerHelper.configureStates(getStates(), otherwise);
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


/** @ngInject */
function OnRun($rootScope, AppSettings) {

	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', function(event, toState) {
		$rootScope.pageTitle = '';

		if (toState.title) {
			$rootScope.pageTitle += toState.title;
			$rootScope.pageTitle += ' \u2014 ';
		}

		$rootScope.pageTitle += AppSettings.appTitle;
	});

}