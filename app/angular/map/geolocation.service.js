"use strict";

const mapModule = require('./map.module');
mapModule.factory('geolocation', geolocation)

/** @ngInject */
function geolocation($q, $rootScope, $window, exception) {

	const services = {
		getLocation: getLocation,
	};
	return services;

	function getLocation(opts) {
		var deferred = $q.defer();

		if (
			$window.navigator &&
			$window.navigator.geolocation
		) {
			$window.navigator.geolocation.getCurrentPosition(success, handleError, opts);
		} else {
			exception.catcher('Browser does not support location services')();
		}

		return deferred.promise;

		function success(position) {
			$rootScope.$apply(function() {deferred.resolve(position);});
		}

		function handleError(error) {
			switch (error.code) {
				case 1:
					exception.catcher('You have rejected access to your location')(error);
					break;
				case 2:
					exception.catcher('Unable to determine your location')(error);
					break;
				case 3:
					exception.catcher('Service timeout has been reached')(error);
					break;
			}
		}
	}
}