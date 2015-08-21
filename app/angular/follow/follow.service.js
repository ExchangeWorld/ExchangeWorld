'use strict';

const followModule = require('./follow.module');
const _             = require('lodash');

followModule.service('followService', followService);

/** @ngInject */
function followService(Restangular, $q, $localStorage) {
	var service = {
		getFollower,
		getFollowing,
	};

	return service;

	//////////

	function getFollower() {
		//console.log(auth.currentUser());
		const defer = $q.defer();

		Restangular
			.all('user/profile/follower')
			.getList({ my_uid: $localStorage.user.uid })
			.then(function(data) {
				//console.log(data);
				if (_.isArray(data)) {
					defer.resolve(data);
				} 
			})
			.catch(function(error) {
				return exception.catcher('[Follower Service] getFollower error: ')(error);
			});
		return defer.promise;
	}

	function getFollowing() {
		const defer = $q.defer();

		Restangular
			.all('user/profile/following')
			.getList({ my_uid: auth.user.uid })
			.then(function(data) {
				//console.log(data);
				if (_.isArray(data)) {
					defer.resolve(data);
				} 
			})
			.catch(function(error) {
				return exception.catcher('[Following Service] getFollowing error: ')(error);
			});
		return defer.promise;
	}

}
