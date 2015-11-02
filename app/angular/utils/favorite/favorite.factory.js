'use strict';

const favoriteModule = require('./favorite.module');
const _              = require('lodash');

favoriteModule.factory('favorite', favorite);

/** @ngInject */
function favorite(Restangular, $q, exception, $localStorage, $mdDialog) {
	const service = {
		getFavorites,
		getMyFavorite,
		postFavorite,
		deleteFavorite,
	};

	return service;

	function getFavorites(gid) {
		const defer = $q.defer();
		Restangular
			.all('star/to')
			.getList({goods_gid: gid})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				} else {
					defer.reject(data);
				}
			}, (error)=> {
				return exception.catcher('[favorite Service] getFavorites error: ')(error);
			});
		return defer.promise;
	}

	function getMyFavorite(uid) {
		const defer = $q.defer();

		Restangular
			.all('star/by')
			.getList({
				starring_user_uid: uid,
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[favorite Service] getMyFavorite error: ')(error);
			});
		return defer.promise;
	
	}
	function postFavorite(newFavorite) {
		const defer = $q.defer();

		Restangular
			.all('star/post')
			.post(newFavorite)
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[favorite Service] postFavorite error: ')(error);
			});
		return defer.promise;
	}

	function deleteFavorite(star) {
		const defer = $q.defer();

		Restangular
			.all('star/delete')
			.remove({
				goods_gid         : star.goods_gid,
				starring_user_uid : star.starring_user_uid,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[favorite Service] deleteStar error: ')(error);
			});
		return defer.promise;
	}

}

