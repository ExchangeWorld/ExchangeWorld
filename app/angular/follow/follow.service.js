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
		let url = type === 'follower' ? 'follow/followers/of' : 'follow/followed/by';

		Restangular
			.all(url)
			.getList({
				follower_uid: uid, 
				followed_uid: uid, 
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				} 
			}, (error)=> {
				return exception.catcher('[Follow Service] getFollow error: ')(error);
			});
		return defer.promise;
	}
}
