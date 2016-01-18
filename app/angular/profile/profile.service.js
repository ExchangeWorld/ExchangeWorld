'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService, exception, logger) {
	var service = {
		getProfile,
		getFavoriteSum,
		editProfile,
		addFollowing,
		deleteFollowing,
		getMyGoods,
	};

	return service;

	//////////
	
	function getProfile(_uid) {
		const defer = $q.defer();

		Restangular
			.oneUrl(`user?uid=${_uid}`)
			.get()
			.then(function(data) {
				defer.resolve(data);
			}, (error)=> {
				defer.reject({ error: error });
				exception.catcher('[Profiles Service] getProfile error: ')(error);
			});

		return defer.promise;
	}

	function getFavoriteSum(uid) {
		const defer = $q.defer();

		Restangular
			.all('star/by')
			.getList({ starring_user_uid: uid })
			.then(function(data) {
				defer.resolve(data);
			}, (error) => {
				return exception.catcher('[Profiles Service] getFavoriteSum error: ')(error);
			});

		return defer.promise;
	}

	function editProfile(profile) {
		const defer = $q.defer();

		profile.route = 'user/edit';

		profile
			.put()
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[profiles Service] updateprofile error: ')(error);
			});
		return defer.promise;
	}

	function addFollowing(my_uid, following_uid) {
		Restangular
			.all('follow/post')
			.post({
				follower_uid : my_uid,
				followed_uid : following_uid,
			})
			.then(function() {
				logger.success('成功追隨', {}, 'DONE');
			});
	}

	function deleteFollowing(my_uid, following_uid) {
		Restangular
			.all('follow/followers/of')
			.getList({
				followed_uid : following_uid,
			})
			.then(function(followers) {
				let followed_by_me = followers.filter(function(f) { return f.fid === my_uid; });
				followed_by_me[0].route = 'follow/delete';
				followed_by_me[0].followed_uid = following_uid;
				followed_by_me[0].remove();
			});
	}

	function getMyGoods(uid) {
		const defer = $q.defer();

		Restangular
			.all('goods/of')
			.getList({ owner_uid: uid })
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(goods) {
						if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
					});
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[profile Service] getProfile error: ')(error);
			});
		return defer.promise;
	}

}
