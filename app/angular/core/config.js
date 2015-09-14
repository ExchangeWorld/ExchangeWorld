"use strict";

const coreModule = require('./core.module');
const angular    = require('angular');
coreModule.config(toastConfig);
coreModule.config(facebookprovider);


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


function facebookprovider(FacebookProvider) {
	// Set your appId through the setAppId method or use the shortcut in the initialize method directly.
	// FacebookProvider.init('376506855853722'); // exwd appID
	FacebookProvider.init('398517123645939'); // exwd Dev_appID
}
