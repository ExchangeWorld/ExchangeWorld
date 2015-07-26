"use strict";

const exceptionModule = require('./exception.module');
exceptionModule.provider('exceptionHandler', exceptionHandlerProvider);

/**
 * Must configure the exception handling
 * @return {[type]}
 */
function exceptionHandlerProvider() {
	this.config = {
		appErrorPrefix : undefined
	};

	this.configure = function(appErrorPrefix) {
		this.config.appErrorPrefix = appErrorPrefix;
	};

	this.$get = function() {
		return { config : this.config };
	};
}



