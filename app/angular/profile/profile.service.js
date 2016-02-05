'use strict';

const profileModule = require('./profile.module');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService, exception, logger) {
	var service = {
		getProfile,
		getFavoriteSum,
		editProfile,
		addFollowing,
		deleteFollowing,
	};

	return service;

	//////////

	async function getProfile(_uid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('user', _uid).get();
			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getFavoriteSum(uid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.all('star/by').getList({ starring_user_uid: uid });
			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function editProfile(profile) {
		const defer = $q.defer();

		try {
			profile.route = `user/${profile.uid}`;
			let data = await profile.put();

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function addFollowing(myUid, followingUid) {
		Restangular
			.all('follow/post')
			.post({
				follower_uid : myUid,
				followed_uid : followingUid,
			})
			.then(function() {
				logger.success('成功追隨', {}, 'DONE');
			});
	}

	function deleteFollowing(myUid, followingUid) {
		Restangular
			.all('follow/followers/of')
			.getList({
				followed_uid : followingUid,
			})
			.then(function(followers) {
				let followedByMe = followers.filter(function(f) { return f.fid === myUid; });
				followedByMe[0].route = 'follow/delete';
				followedByMe[0].followedUid = followingUid;
				followedByMe[0].remove();
			});
	}

}
