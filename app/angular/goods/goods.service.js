'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
goodsModule.factory('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q, exception, $mdDialog) {

	const service = {
		getGood,
		getUserGoods,
		editGood,
		deleteGoods,
		
		getComment,
		postComment,
		deleteComment,
		
		showQueueBox,
		showQueuingBox,
		getQueue,
		postQueue,
		deleteQueue,

		postExchange,
	};
	return service;


	function getGood(id) {
		const defer = $q.defer();

		var gid = parseInt(id, 10);
		if(!gid) {
			defer.reject({
				error: true,
				msg: 'invalid gid'
			});
			return defer.promise;
		}

		Restangular
			.all('goods')
			.getList({ gid : gid })
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(goods) {
						if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
					});
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[Goods Service] getGood error: ')(error);
			});
		return defer.promise;
	}

	function getUserGoods(owner_uid) {
		const defer = $q.defer();

		Restangular
			.all('goods/of')
			.getList({ owner_uid : owner_uid })
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(goods) {
						if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
					});
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[Goods Service] getuserGood error: ')(error);
			});
		return defer.promise;
	}

	function editGood(gid, name, cate, des) {
		const defer = $q.defer();

		getGood(gid)
			.then(function(goods) {
				goods             = goods[0];
				goods.name        = name;
				goods.category    = cate;
				goods.description = des;
				goods.route       = 'goods/edit';
				goods.photo_path = JSON.stringify(goods.photo_path);

				goods
					.put()
					.then(function(data) {
						defer.resolve(data);
					})
					.catch(function(error) {
						return exception.catcher('[goods Service] updategoods error: ')(error);
					});
			});

		return defer.promise;
	}

	function deleteGoods(gid) {
		const defer = $q.defer();

		Restangular
			.all('goods/delete')
			.remove({ gid: gid })
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] deleteGoods error: ')(error);
			});

		return defer.promise;
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
			}, (error)=> {
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

	function getQueue(host_goods_gid) {
		const defer = $q.defer();
		Restangular
			.all('queue/of')
			.getList({host_goods_gid: host_goods_gid})
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(goods) {
						if (_.isString(goods.good.photo_path)) goods.good.photo_path = JSON.parse(goods.good.photo_path);
						return goods;
					});
					defer.resolve(data);
				} else {
					defer.reject(data);
				}
			}, (error)=> {
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
				deleteAllQueues(goods1_gid);
				deleteAllQueues(goods2_gid);
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postExchang error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * When goodsA & goodsB publish an exchange,
	 * must delete all queuing list of goodsA & goodsB
	 */
	function deleteAllQueues(gid) {
		Restangular
			.all('queue/by')
			.getList({queuer_goods_gid: gid})
			.then(function(data) {
				if (_.isArray(data)) {
					data.map(function(host_goods) {
						deleteQueue(host_goods.host_goods_gid, gid);
					});

				}
			}, (error)=> {
				return exception.catcher('[Goods Service] getQueue error: ')(error);
			});
	}

	function showQueueBox(ev, myGoods, queuing_goods_gid, host_uid) {
		$mdDialog.show({
			templateUrl: 'goods/goods.queue.html',
			controllerAs: 'vm',
			controller: QueueController,
			locals: {
				myGoods           : myGoods,
				queuing_goods_gid : queuing_goods_gid,
				host_uid          : host_uid,
			}
		});
		function QueueController($mdDialog, logger, myGoods, queuing_goods_gid, host_uid, notification, $state) {
			const vm             = this;
			vm.myGoods           = myGoods;
			vm.queuing_goods_gid = queuing_goods_gid;
			vm.confirm           = onConfirm;
			vm.cancel            = onCancel;
			vm.onClickGoods      = gid => $state.go('root.withSidenav.goods', { gid });

			function onConfirm(selected_gid) {
				$mdDialog
					.hide(selected_gid)
					.then(function() {
						postQueue(vm.queuing_goods_gid, selected_gid)
							.then(function(data) {
								logger.success('成功發出排請求', data, 'DONE');
								notification
									.postNotification({
										sender_uid   : vm.myGoods[0].owner_uid,
										receiver_uid : host_uid, 
										trigger_url  : `/seek/${queuing_goods_gid}/queuing`,
										content      : '有人排了你的物品',
									});
							});
						if($state.current.name === 'root.withSidenav.goods.queue') {
							$state.go('^');
						}
					});
			}
			function onCancel() {
				$mdDialog.cancel();
				if($state.current.name === 'root.withSidenav.goods.queue') {
					$state.go('^');
				}
			}
		}
	}

	function showQueuingBox(ev, queuingGoods, host_goods_gid) {
		$mdDialog.show({
			templateUrl: 'goods/goods.queuing.html',
			controllerAs: 'vm',
			controller: QueuingController,
			locals: {
				queuingGoods   : queuingGoods,
				host_goods_gid : host_goods_gid,
			}
		});
		function QueuingController($mdDialog, logger, queuingGoods, host_goods_gid, $localStorage, notification, $state) {
			const vm          = this;
			vm.queuingGoods   = queuingGoods;
			vm.host_goods_gid = host_goods_gid;
			vm.confirm        = onConfirm;
			vm.cancel         = onCancel;
			vm.onClickGoods   = gid=> { $state.go('root.withSidenav.goods', {gid: gid}); };

			function onConfirm(selected_goods) {
				selected_goods = JSON.parse(selected_goods);
				$mdDialog
					.hide(selected_goods)
					.then(function(selected_goods) {
						postExchange(selected_goods.gid, host_goods_gid)
							.then(function(data) {
								logger.success('成功接受一個排', data, 'DONE');
								notification
									.postNotification({
										sender_uid   : $localStorage.user.uid,
										receiver_uid : selected_goods.owner_uid, 
										trigger_url  : `/manage/${selected_goods.owner_uid}/exchange`,
										content      : '有人接受了你的排，進入交換階段',
									});
							});
						if($state.current.name === 'root.withSidenav.goods.queuing') {
							$state.go('^');
						}
					});
			}
			function onCancel() {
				$mdDialog.cancel();
				if($state.current.name === 'root.withSidenav.goods.queuing') {
					$state.go('^');
				}
			}
		}
	}

}



