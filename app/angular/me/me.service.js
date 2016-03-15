'use strict';

const meModule = require('./me.module');

meModule.service('meService', meService);

/** @ngInject */
function meService(Restangular, $q, facebookService, exception, $mdMedia, $mdDialog) {
	var service = {
		getProfile,
		editProfile,
		uploadHeadPhoto,
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

}
