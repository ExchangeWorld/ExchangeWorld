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
			.all('user/profile')
			.getList({ uid : _uid })
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data[0]);
				} else if (_.isObject(data)) {
					defer.resolve(data);
				}
			}, (error)=> {
				defer.reject({ error: error });
				exception.catcher('[Profiles Service] getProfile error: ')(error);
			});

		return defer.promise;
	}

	function getFavoriteSum(uid) {
		const defer = $q.defer();

		Restangular
			.all('star/toOwner')
			.getList({ owner_uid: uid })
			.then(function(data) {
				defer.resolve(data);
			}, (error) => {
				return exception.catcher('[Profiles Service] getFavoriteSum error: ')(error);
			});

		return defer.promise;
	}

	function editProfile(profile) {
		const defer = $q.defer();

		profile.route = 'user/profile/edit';
        profile.byuser = byuserGen(profile.uid);


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
			.all('user/profile/following/post')
			.post({
				my_uid        : my_uid,
				following_uid : following_uid,
			});
		Restangular
			.all('user/profile/follower/post')
			.post({
				my_uid       : following_uid,
				follower_uid : my_uid,
			});
		logger.success('成功追隨', {}, 'DONE');
	}

	function deleteFollowing(my_uid, following_uid) {
		Restangular
			.all('user/profile/following/delete')
			.remove({
				my_uid        : my_uid,
				following_uid : following_uid,
			});
		Restangular
			.all('user/profile/follower/delete')
			.remove({
				my_uid       : following_uid,
				follower_uid : my_uid,
			});
	}

	function getMyGoods(uid) {
		const defer = $q.defer();

		Restangular
			.all('goods/of')
			.getList({
				owner_uid: uid,
			})
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
