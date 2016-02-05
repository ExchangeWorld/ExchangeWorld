'use strict';

const followModule = require('./follow.module');

followModule.service('followService', followService);

/** @ngInject */
function followService(Restangular, $q, exception, logger) {
	var service = {
		getFollow,
		addFollowing,
		deleteFollowing,
	};

	return service;

	//////////

	async function getFollow(uid, type) {
		const defer = $q.defer();

		try {
			let peoples = (type === 'follower')
				? await Restangular.one('follow/user', uid).getList()
				: await Restangular.one('user', uid).getList('follow');

			defer.resolve(peoples);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function addFollowing(myUid, followingUid) {
		const defer = $q.defer();

		try {
			await Restangular.all('follow').post({
					follower_uid : myUid,
					followed_uid : followingUid,
				});

			logger.success('成功追隨', {}, 'DONE');
			defer.resolve([]);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteFollowing(myUid, followingUid) {
		const defer = $q.defer();

		try {
			await Restangular.one('follow', myUid).one('to', followingUid).remove();

			defer.resolve([]);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}
}
