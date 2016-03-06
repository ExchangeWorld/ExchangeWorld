'use strict';

const profileModule = require('./profile.module');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService, exception) {
	var service = {
		getProfile,
		getFavoriteSum,
		editProfile,
	};

	return service;

	//////////

	async function getProfile(_uid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('user', _uid).get();
			data.goods.forEach(function(goods) {
				try {
					goods.photo_path = JSON.parse(goods.photo_path);
				} catch (err) {
					goods.photo_path = '';
				}
			});
			data.myGoodsPending = data.goods.filter(function(g) { return g.exchanged === 0; });
			data.myGoodsExchanged = data.goods.filter(function(g) { return g.exchanged === 1; });
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


}
