'use strict';

const favoriteModule = require('./favorite.module');
const _              = require('lodash');

favoriteModule.factory('favorite', favorite);

/** @ngInject */
function favorite(Restangular, $q, exception, logger) {
	const service = {
		getFavorites,
		getMyFavorite,
		postFavorite,
		deleteFavorite,
	};

	return service;

	async function getFavorites(gid) {
		const defer = $q.defer();

		try {
			let stars = await Restangular.one('goods', gid).getList('star');
			defer.resolve(stars);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getMyFavorite(uid) {
		const defer = $q.defer();

		try {
			let stars = await Restangular.one('user', uid).getList('star');
			defer.resolve(stars);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function postFavorite(newFavorite) {
		const defer = $q.defer();

		try {
			let star = await Restangular.all('star').post(newFavorite);
			defer.resolve(star);
			logger.success('已加到最愛', star, 'DONE');
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteFavorite(star) {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('star', star.starring_user_uid).one('to', star.goods_gid).remove();
			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

}

