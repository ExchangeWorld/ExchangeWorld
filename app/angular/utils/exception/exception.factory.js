"use strict";

const exceptionModule = require('./exception.module');
exceptionModule.factory('exception', exception);

/** @ngInject */
function exception($q, logger) {

	const service = {
		catcher: catcher
	};
	return service;

	function catcher(message) {
		return function(e) {
			//var thrownDescription;
			//var newMessage;
			//if(e.data && e.data.description) {
				//thrownDescription = '\n' + e.data.description;
				//newMessage = message + thrownDescription;
			//}
			//e.data.description = newMessage;
			logger.error(message);
			return $q.reject(e);
		};
	}
}