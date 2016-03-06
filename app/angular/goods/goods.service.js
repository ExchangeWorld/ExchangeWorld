'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
goodsModule.factory('goodsService', goodsService);

/** @ngInject */
function goodsService(Restangular, $q, exception, $mdDialog, $mdMedia, AvailableCategory) {

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
			let goods = await Restangular.one('goods', id).get();
			if (!goods) throw 'goods is null or undefined.';

			try {
				goods.photo_path = JSON.parse(goods.photo_path);
			} catch (err) {
				goods.photo_path = '';
			}

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
			let goods = await Restangular.one('user', ownerUid).getList('goods');
			if (!_.isArray(goods)) throw 'goods not array';

			goods.forEach(function(g) {
				try {
					g.category_alias = _.result(_.find(AvailableCategory, 'label', g.category), 'alias');
					g.photo_path = JSON.parse(g.photo_path);
				} catch (err) {
					g.photo_path = '';
				}            
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
			let goods         = await getGood(newValue.gid);
			goods.name        = newValue.name;
			goods.category    = newValue.category;
			goods.description = newValue.description;
			goods.route       = 'goods/edit';
			goods.photo_path  = JSON.stringify(goods.photo_path);

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
			let comments = await Restangular.all('comment/of/goods').getList({ goods_gid: gid });

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
			let goods = await Restangular.one('goods', hostGoodsGid).getList('queue');
			if (!_.isArray(goods)) throw 'goods not array.';

			goods.forEach(function(g) {
				try {
					g.category_alias = _.result(_.find(AvailableCategory, 'label', g.category), 'alias');
					g.photo_path = JSON.parse(g.photo_path);
				} catch (err) {
					g.photo_path = '';
				}
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
			let res = await Restangular.all('queue').post( newQueue );

			defer.resolve(res);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function postExchange(goods1Gid, goods2Gid) {
		const defer = $q.defer();
		try {
			let newExchange = {
				goods_one_gid: goods1Gid,
				goods_two_gid: goods2Gid,
			};
			let res = await Restangular.all('exchange/create').post(newExchange);

			defer.resolve(res);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function showQueueBox(ev, myGoods, queuingGoodsGid, hostUid) {
		$mdDialog.show({
			templateUrl: 'goods/goods.queue.html',
			controllerAs: 'vm',
			controller: QueueController,
			fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
			locals: {
				myGoods: myGoods,
				queuingGoodsGid: queuingGoodsGid,
				hostUid: hostUid,
			}
		});

		function QueueController($mdDialog, logger, myGoods, queuingGoodsGid, hostUid, notification, $state) {
			const vm           = this;
			vm.myGoods         = myGoods;
			vm.queuingGoodsGid = queuingGoodsGid;
			vm.confirm         = onConfirm;
			vm.cancel          = onCancel;
			vm.onClickGoods    = gid => $state.go('root.withSidenav.goods', { gid });

			async function onConfirm(selectedGid) {
				await $mdDialog.hide(selectedGid);

				let newQueue = await postQueue(parseInt(vm.queuingGoodsGid, 10), parseInt(selectedGid, 10));

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
			fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
			locals: {
				queuingGoods: queuingGoods,
				hostGoodsGid: hostGoodsGid,
			}
		});

		/** @ngInject */
		function QueuingController($mdDialog, logger, queuingGoods, hostGoodsGid, $localStorage, notification, $state, exception) {
			const vm        = this;
			vm.queuingGoods = queuingGoods;
			vm.hostGoodsGid = hostGoodsGid;
			vm.confirm      = onConfirm;
			vm.cancel       = onCancel;
			vm.onClickGoods = gid => $state.go('root.withSidenav.goods', { gid: gid });

			async function onConfirm(selectedGoods) {
				try {
					selectedGoods = JSON.parse(selectedGoods);
					await $mdDialog.hide(selectedGoods);

					let newExchange = await postExchange(selectedGoods.gid, hostGoodsGid);
					logger.success('成功接受一個排', newExchange, 'DONE');

					if ($state.current.name === 'root.withSidenav.goods.queuing') {
						$state.go('^');
					}
				} catch (err) {
					exception.catcher('唉呀出錯了！')(err);
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
