'use strict';

const profileModule = require('./profile.module');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService, exception) {
	var service = {
		getProfile,
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
			data.myStarGoods = data.star_starring_user.map((g)=> {
				try {
					g.goods.photo_path = JSON.parse(g.goods.photo_path);
				} catch (err) {
					g.goods.photo_path = '';
				}
				return g.goods;
			
			});
			
			data.scores = 0;
			data.myGoodsExchanged.forEach(function(g) {
				data.scores += g.rate;
			});

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

}
