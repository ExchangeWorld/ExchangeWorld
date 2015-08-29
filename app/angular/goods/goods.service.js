'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
goodsModule.factory('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q, exception) {

	const service = {
		getGood,
		editGood,
		getComment,
		postComment,
		deleteComment,
		getStars,
		postStar,
		deleteStar,
	};
	return service;


	function getGood(gid) {
		const defer = $q.defer();

		Restangular
			.all('goods')
			.getList({ gid : gid })
			.then(function(data) {

				getStars(gid)
					.then(function(stars) {
						getComment(gid)
							.then(function(comments) {
								if (_.isArray(data)) {
									defer.resolve(data[0]);
								} else if (_.isObject(data)) {
									defer.resolve(data);
								}
							});
					});
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] getGood error: ')(error);
			});
		return defer.promise;
	}

	function editGood() {
		return ;
	}

	function getComment(gid) {
		const defer = $q.defer();

		Restangular
			.all('comment/of/goods')
			.getList({ goods_gid : gid })
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] getComments error: ')(error);
			});
		return defer.promise;
	}

	function postComment(newComment) {
		const defer = $q.defer();

		Restangular
			.all('comment/post')
			.post(newComment)
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postComments error: ')(error);
			});
		return defer.promise;
	}

	function deleteComment(comment) {
		const defer = $q.defer();

		Restangular
			.all('comment/delete')
			.remove({ cid: comment.cid })
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] deleteComment error: ')(error);
			});
		return defer.promise;
	}

	function getStars(gid) {
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
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] getStars error: ')(error);
			});
		return defer.promise;
	}

	function postStar(newStar) {
		const defer = $q.defer();

		Restangular
			.all('star/post')
			.post(newStar)
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postStar error: ')(error);
			});
		return defer.promise;
	}

	function deleteStar(star) {
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
				return exception.catcher('[Goods Service] deleteStar error: ')(error);
			});
		return defer.promise;
	}
}
