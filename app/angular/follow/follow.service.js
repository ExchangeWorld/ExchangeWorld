'use strict';

const followModule = require('./follow.module');
const _             = require('lodash');

followModule.service('followService', followService);

/** @ngInject */
function followService(Restangular, $q, exception) {
	var service = {
		getFollow,
	};

	return service;

	//////////

	function getFollow(uid, type) {
		const defer = $q.defer();

		Restangular
			.all('user/profile/' + type)
			.getList({ my_uid: uid })
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				} 
			}, error => exception.catcher('[Follow Service] getFollow error: ')(error));
			
		return defer.promise;
	}
}
