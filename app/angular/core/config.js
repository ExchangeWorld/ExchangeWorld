"use strict";

const coreModule = require('./core.module');
const angular    = require('angular');
coreModule.config(toastConfig);


/** @ngInject */
function toastConfig(toastrConfig) {
	angular.extend(toastrConfig, {
		positionClass : 'toast-bottom-right',
		timeOut : 3000,
	});
}

var config = {
	appErrorPrefix : '[<%= appName %> Error] ',
	appTitle : '<%= appName %>'
};

coreModule.value('config', config);
coreModule.config(configure);

/** @ngInject */
function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
	if ($logProvider.debugEnabled) {
		$logProvider.debugEnabled(true);
	}
	exceptionHandlerProvider.configure('[<%= appName %> Error]');
	//routerHelperProvider.configure({ docTitle : config.appTitle + ': ' });
}