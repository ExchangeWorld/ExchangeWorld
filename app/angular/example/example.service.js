'use strict';

const exampleModule = require('./example.module');
exampleModule.service('ExampleService', ExampleService);

/** @ngInject */
function ExampleService($q, $http) {

	var service = {};

	service.get = function() {
		var deferred = $q.defer();

		$http.get('apiPath').success(function(data) {
			deferred.resolve(data);
		}).error(function(err, status) {
			deferred.reject(err, status);
		});

		return deferred.promise;
	};

	return service;

}
