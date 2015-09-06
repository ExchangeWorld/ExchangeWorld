'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
goodsModule.factory('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q, exception, $mdDialog) {

	const service = {
		getGood,
		editGood,
		
		getComment,
		postComment,
		deleteComment,
		
		getStars,
		postStar,
		deleteStar,

		showQueueBox,
		showQueuingBox,
		getQueue,
		postQueue,
		deleteQueue,

		postExchange,
	};
	return service;


	function getGood(gid, owner_uid) {
		const defer = $q.defer();

		Restangular
			.all('goods')
			.getList({
				gid       : gid,
				owner_uid : owner_uid,
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
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

	function getQueue(host_goods_gid) {
		const defer = $q.defer();
		Restangular
			.all('queue/of')
			.getList({host_goods_gid: host_goods_gid})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				} else {
					defer.reject(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] getQueue error: ')(error);
			});
		return defer.promise;
	}

	function postQueue(host_goods_gid, queuer_goods_gid) {
		const defer = $q.defer();

		Restangular
			.all('queue/post')
			.post({
				host_goods_gid   : host_goods_gid,
				queuer_goods_gid : queuer_goods_gid,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postQueue error: ')(error);
			});
		return defer.promise;
	}
	
	function deleteQueue(host_goods_gid, queuer_goods_gid) {
		const defer = $q.defer();

		Restangular
			.all('queue/delete')
			.remove({
				host_goods_gid   : host_goods_gid,
				queuer_goods_gid : queuer_goods_gid,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] deleteQueue error: ')(error);
			});
		return defer.promise;
	}

	function postExchange(goods1_gid, goods2_gid) {
		const defer = $q.defer();

		Restangular
			.all('exchange/create')
			.post({
				goods1_gid : goods1_gid,
				goods2_gid : goods2_gid,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postExchang error: ')(error);
			});
		return defer.promise;
	}

	function showQueueBox(ev, myGoods, queuing_goods_gid) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'goods/goods.queue.html',
			controllerAs: 'vm',
			controller: QueueController,
			locals: {
				myGoods           : myGoods,
				queuing_goods_gid : queuing_goods_gid,
			}
		});
		function QueueController($mdDialog, logger, myGoods, queuing_goods_gid) {
			const vm             = this;
			vm.myGoods           = myGoods;
			vm.queuing_goods_gid = queuing_goods_gid;
			vm.comfrim           = onComfrim;
			vm.cancel            = onCancel;

			function onComfrim(selected_gid) {
				$mdDialog
					.hide(selected_gid)
					.then(function() {
						postQueue(vm.queuing_goods_gid, selected_gid)
							.then(function(data) {
								logger.success('成功發出排請求', data, 'DONE');
							});
					});
			}
			function onCancel() {
				$mdDialog.cancel();
			};
		}
	}

	function showQueuingBox(ev, queuingGoods, host_goods_gid) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'goods/goods.queuing.html',
			controllerAs: 'vm',
			controller: QueuingController,
			locals: {
				queuingGoods   : queuingGoods,
				host_goods_gid : host_goods_gid,
			}
		});
		function QueuingController($mdDialog, logger, queuingGoods, host_goods_gid) {
			const vm          = this;
			vm.queuingGoods   = queuingGoods;
			vm.host_goods_gid = host_goods_gid;
			vm.comfrim        = onComfrim;
			vm.cancel         = onCancel;

			function onComfrim(selected_gid) {
				$mdDialog
					.hide(selected_gid)
					.then(function(selected_gid) {
						postExchange(selected_gid, host_goods_gid)
							.then(function(data) {
								logger.success('成功接受一個排', data, 'DONE');
							});
					});
			}
			function onCancel() {
				$mdDialog.cancel();
			};
		}
	}

}



