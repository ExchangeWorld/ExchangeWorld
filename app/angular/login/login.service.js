'use strict';

const loginModule = require('./login.module');

loginModule.service('loginService', loginService);

/** @ngInject */
function loginService(Restangular, $q, facebookService, exception) {
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
					goods.photoPath = JSON.parse(goods.photo_path);
				} catch (err) {
					goods.photoPath = '';
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

	async function editProfile(login) {
		const defer = $q.defer();

		try {
			login.route = `user/${login.uid}`;
			let data = await login.put();

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}


}
