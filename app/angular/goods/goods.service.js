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
		if (!gid) {
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

	async function getUserGoods(ownerUid) {
		const defer = $q.defer();

		try {
			let goods = await Restangular.all('goods/of').getList({	owner_uid: ownerUid	});
			if (!_.isArray(goods)) throw 'goods not array';

			goods.forEach(function(g) {
				if (_.isString(g.photo_path)) g.photo_path = JSON.parse(g.photo_path);
			});
			defer.resolve(goods);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function editGood(newValue) {
		const defer = $q.defer();

		try {
			let goods = await getGood(newValue.gid);
			goods.name = newValue.name;
			goods.category = newValue.category;
			goods.description = newValue.description;
			goods.route = 'goods/edit';
			goods.photo_path = JSON.stringify(goods.photo_path);

			let editedGoods = await goods.put();

			defer.resolve(editedGoods);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteGoods(gid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.all('goods/delete').remove({ gid: gid });
			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getComment(gid) {
		const defer = $q.defer();

		try {
			let comments = await Restangular.all('comment/of/goods').getList({ goods_gid: gid	});

			if (!_.isArray(comments)) throw 'comments not array.';
			defer.resolve(comments);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function postComment(newComment) {
		const defer = $q.defer();

		try {
			let comment = await Restangular.all('comment/post').post(newComment);
			defer.resolve(comment);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteComment(comment) {
		const defer = $q.defer();

		try {
			let res = await Restangular.all('comment/delete').remove({ cid: comment.cid });
			defer.resolve(res);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getQueue(hostGoodsGid) {
		const defer = $q.defer();

		try {
			let goods = await Restangular.all('queue/of/goods').getList({ host_goods_gid: hostGoodsGid });
			if (!_.isArray(goods)) throw 'goods not array.';

			goods.forEach(function(g) {
				if (_.isString(g.good.photo_path)) g.good.photo_path = JSON.parse(g.good.photo_path);
			});

			defer.resolve(goods);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function postQueue(hostGoodsGid, queuerGoodsGid) {
		const defer = $q.defer();

		try {
			let newQueue = {
				host_goods_gid: hostGoodsGid,
				queuer_goods_gid: queuerGoodsGid,
			};
			let res = await Restangular.all('queue/post').post({ newQueue });

			defer.resolve(res);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

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

	async function postExchange(goods1Gid, goods2Gid) {
		const defer = $q.defer();
		try {
			let newExchange = {
				goods1_gid: goods1Gid,
				goods2_gid: goods2Gid,
			};
			let res = await Restangular.all('exchange/create').post({ newExchange });

			defer.resolve(res);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

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
				myGoods: myGoods,
				queuingGoodsGid: queuingGoodsGid,
				hostUid: hostUid,
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
			vm.onClickGoods = gid => $state.go('root.withSidenav.goods', { gid: gid });

			async function onConfirm(selectedGoods) {
				selectedGoods = JSON.parse(selectedGoods);
				await $mdDialog.hide(selectedGoods);

				let newExchange = await postExchange(selectedGoods.gid, hostGoodsGid);
				logger.success('成功接受一個排', newExchange, 'DONE');

				if ($state.current.name === 'root.withSidenav.goods.queuing') {
					$state.go('^');
				}
			}

			function onCancel() {
				$mdDialog.cancel();
				if ($state.current.name === 'root.withSidenav.goods.queuing') {
					$state.go('^');
				}
			}
		}
	}

}
