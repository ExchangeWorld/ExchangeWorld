'use strict';

const meModule = require('./me.module');
const _        = require('lodash');

meModule.service('meService', meService);

/** @ngInject */
function meService(Restangular, $q, facebookService, exception, $mdMedia, $mdDialog, AvailableCategory) {
	var service = {
		getProfile,
		editProfile,
		uploadHeadPhoto,

		getMyRequest,
		getExchanges,
		deleteExchange,
		agreeExchange,
		acceptRequest,
		showCompleteExchange,
	};

	return service;

	//////////

	async function getProfile() {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('user').one('me').get();
			data.goods.forEach(function(goods) {
				try {
					goods.photo_path = JSON.parse(goods.photo_path);
				} catch (err) {
					goods.photo_path = '';
				}
			});
			data.myGoodsPending = data.goods.filter((g)=> { return g.exchanged === 0; });
			data.myGoodsExchanged = data.goods.filter((g)=> { return g.exchanged === 1; });
			data.myStarGoods = data.star_starring_user.map((g)=> {
				try {
					g.goods.photo_path = JSON.parse(g.goods.photo_path);
				} catch (err) {
					g.goods.photo_path = '';
				}
				return g.goods;
			});
			
			data.scores = 0;
			data.myGoodsExchanged.forEach((g)=> { data.scores += g.rate; });

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function editProfile(me) {
		const defer = $q.defer();

		try {
			me.route = `user/${me.uid}`;
			let data = await me.put();

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function uploadHeadPhoto(me) {
		$mdDialog.show({
			templateUrl: 'me/headphotoModal.html',
			//clickOutsideToClose: true,
			controllerAs: 'vm',
			controller: HeadPhotoController,
			fullscreen: ($mdMedia('sm')||$mdMedia('xs')),
			locals: {
				me: me
			}
		});

		/** @ngInject */
		function HeadPhotoController($state, $scope, me, logger) {
			const vm          = this;
			vm.imgSelect      = {};
			vm.myCroppedImage = '';
			vm.onCancel       = onCancel;
			vm.submit         = submit;

			$scope.$watch('vm.imgSelect', ()=> {
				vm.dataUri = `data:image/png;base64,${vm.imgSelect.base64}`;
			});

			function onCancel() {
				$mdDialog.cancel();
				$state.reload();
			}

			async function submit() {
				try {
					me.photo_path = await upload();
					me.route = `${me.uid}/photo`;
					await me.put();

					logger.success('更新成功', null, 'DONE');
					onCancel();
				} catch (err) {
					exception.catcher('上傳失敗')(err);
				}
			}

			async function upload() {
				const defer = $q.defer();

				let img = {
					base64   : vm.myCroppedImage,
					filetype : 'png'
				};

				try {
					let url = await Restangular.all('upload/image').post(img);
					defer.resolve(url);
				} catch (err) {
					defer.reject(err);
				}

				return defer.promise;
			}
		}
	}

	async function getMyRequest() {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('user').one('me').one('goods').one('queue').getList();
			data.forEach((r)=> {
				try {
					r.photo_path = JSON.parse(r.photo_path);
				} catch (err) {
					r.photo_path = [];
				}
			});

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getExchanges(ownerUid) {
		const defer = $q.defer();

		try {
			let exchanges = await Restangular.one('user', ownerUid).getList('exchange');
			exchanges.forEach((e)=> {
				try {
					e.other_goods.cate_alias = _.result(_.find(AvailableCategory, { 'label': e.other_goods.category }), 'alias');
					e.other_goods.photo_path = JSON.parse(e.other_goods.photo_path);
				} catch (err) {
					e.other_goods.photo_path = '';
				}
			});
			defer.resolve(exchanges);
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

	async function acceptRequest(selectedGoodsGid, hostGoodsGid) {
		const defer = $q.defer();
		
		try {
			let newExchange = await postExchange(selectedGoodsGid, hostGoodsGid);

			defer.resolve(newExchange);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function agreeExchange(exchange) {
		const defer = $q.defer();

		try {
			await Restangular.one('exchange', exchange.eid).one('agree').put();
			defer.resolve(null);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function deleteExchange(exchange) {
		const defer = $q.defer();

		try {
			await Restangular.one('exchange', exchange.eid).one('drop').put();
			defer.resolve(null);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function showCompleteExchange(ev, thisExchange, callback) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'me/rateExchange.html',
			fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
			controllerAs: 'vm',
			controller: onCompleteController,
			locals: {
				thisExchange: thisExchange,
			}
		});

		/** @ngInject */
		function onCompleteController($mdDialog, logger, exchangeService, thisExchange) {
			const vm        = this;
			vm.thisExchange = thisExchange;
			vm.rating       = 3;
			vm.confirm      = onConfirm;
			vm.cancel       = onCancel;

			async function onConfirm(scores) {
				let score = await $mdDialog.hide(scores);
				let data = exchangeService.agreeExchange(thisExchange);

				rating(vm.thisExchange.other_goods.gid, score);
				logger.success('成功評價此交易', data, 'DONE');
				callback();
			}
			function onCancel() {
				$mdDialog.cancel();
			}

			async function rating(gid, rate) {
				const defer = $q.defer();

				try {
					let goods = await Restangular.one('goods', gid).get();
					goods.route = `goods/${goods.gid}/rate`;
					goods.rate = rate;
					await goods.put();
				} catch (err) {
					exception.catcher('唉呀出錯了！')(err);
					defer.reject(err);
				}

				return defer.promise;
			}

		}
	
	}
}
