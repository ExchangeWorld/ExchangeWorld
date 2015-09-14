"use strict";

const loggerModule = require('./logger.module');
loggerModule.factory('logger', logger);

/** @ngInject */
function logger($log, toastr) {

	const service = {
		showToasts : true,
		error : error,
		info : info,
		success : success,
		warning : warning,
		log : $log.log
	};
	return service;


	function error(message, data, title) {
		toastr.error(message, title);
		$log.error('Error: ' + message, data);
	}

	function info(message, data, title) {
		toastr.info(message, title);
		$log.info('Info: ' + message, data);
	}

	function success(message, data, title) {
		toastr.success(message, title);
		$log.info('Success: ' + message, data);
	}

	function warning(message, data, title) {
		toastr.warning(message, title);
		$log.warn('Warning: ' + message, data);
	}
}