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
		//deleteQueue,

		postExchange,
	};
	return service;


	async function getGood(id) {
		const defer = $q.defer();

		var gid = parseInt(id, 10);
		if(!gid) {
			defer.reject({
				error: true,
				msg: 'invalid gid'
			});
			return defer.promise;
		}

		try {
			let goods = await Restangular.oneUrl(`goods?gid=${gid}`).get();
			if (!goods) throw 'goods is null or undefined.';
			if (!_.isString(goods.photo_path)) throw 'photo_path is not JSON.';

			goods.photo_path = JSON.parse(goods.photo_path);
			defer.resolve(goods);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function getUserGoods(ownerUid) {
		const defer = $q.defer();

		Restangular
			.all('goods/of')
			.getList({ owner_uid : ownerUid })
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

	function editGood(newValue) {
		const defer = $q.defer();

		getGood(newValue.gid)
			.then(function(goods) {
				goods.name        = newValue.name;
				goods.category    = newValue.category;
				goods.description = newValue.description;
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

	function getQueue(hostGoodsGid) {
		const defer = $q.defer();
		Restangular
			.all('queue/of/goods')
			.getList({host_goods_gid: hostGoodsGid})
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

	function postQueue(hostGoodsGid, queuerGoodsGid) {
		const defer = $q.defer();

		Restangular
			.all('queue/post')
			.post({
				host_goods_gid   : hostGoodsGid,
				queuer_goods_gid : queuerGoodsGid,
			})
			.then(function(data) {
				defer.resolve(data);

			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] postQueue error: ')(error);
			});
		return defer.promise;
	}
	
	/* should done by server
	function deleteQueue(hostGoodsGid, queuerGoodsGid) {
		const defer = $q.defer();

		Restangular
			.all('queue/delete')
			.remove({
				host_goods_gid   : hostGoodsgid,
				queuer_goods_gid : queuerGoodsGid,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Goods Service] deleteQueue error: ')(error);
			});
		return defer.promise;
	}
	*/

	function postExchange(goods1Gid, goods2Gid) {
		const defer = $q.defer();

		Restangular
			.all('exchange/create')
			.post({
				goods1_gid : goods1Gid,
				goods2_gid : goods2Gid,
			})
			.then(function(data) {
				//deleteAllQueues(goods1_gid);
				//deleteAllQueues(goods2_gid);
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
	 */

	function showQueueBox(ev, myGoods, queuingGoodsGid, hostUid) {
		$mdDialog.show({
			templateUrl: 'goods/goods.queue.html',
			controllerAs: 'vm',
			controller: QueueController,
			locals: {
				myGoods           : myGoods,
				queuingGoodsGid : queuingGoodsGid,
				hostUid          : hostUid,
			}
		});
		function QueueController($mdDialog, logger, myGoods, queuingGoodsGid, hostUid, notification, $state) {
			const vm             = this;
			vm.myGoods           = myGoods;
			vm.queuingGoodsGid = queuingGoodsGid;
			vm.confirm           = onConfirm;
			vm.cancel            = onCancel;
			vm.onClickGoods      = gid => $state.go('root.withSidenav.goods', { gid });

			async function onConfirm(selectedGid) {
				await $mdDialog.hide(selectedGid);

				let newQueue = await postQueue(vm.queuingGoodsGid, selectedGid);

				logger.success('成功發出排請求', newQueue, 'DONE');

				if($state.current.name === 'root.withSidenav.goods.queue') {
					$state.go('^');
				}
			}
			function onCancel() {
				$mdDialog.cancel();
				if($state.current.name === 'root.withSidenav.goods.queue') {
					$state.go('^');
				}
			}
		}
	}

	function showQueuingBox(ev, queuingGoods, hostGoodsGid) {
		$mdDialog.show({
			templateUrl: 'goods/goods.queuing.html',
			controllerAs: 'vm',
			controller: QueuingController,
			locals: {
				queuingGoods: queuingGoods,
				hostGoodsGid: hostGoodsGid,
			}
		});
		function QueuingController($mdDialog, logger, queuingGoods, hostGoodsGid, $localStorage, notification, $state) {
			const vm        = this;
			vm.queuingGoods = queuingGoods;
			vm.hostGoodsGid = hostGoodsGid;
			vm.confirm      = onConfirm;
			vm.cancel       = onCancel;
			vm.onClickGoods = gid => { $state.go('root.withSidenav.goods', {gid: gid}); };

			async function onConfirm(selectedGoods) {
				selectedGoods = JSON.parse(selectedGoods);
				await $mdDialog.hide(selectedGoods);
				
				let newExchange = await postExchange(selectedGoods.gid, hostGoodsGid);
				logger.success('成功接受一個排', newExchange, 'DONE');

				if($state.current.name === 'root.withSidenav.goods.queuing') {
					$state.go('^');
				}
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



