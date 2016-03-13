'use strict';

const profileModule = require('./profile.module');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService, exception, $mdMedia, $mdDialog) {
	var service = {
		getProfile,
		getFavoriteSum,
		editProfile,
		uploadHeadPhoto,
	};

	return service;

	//////////

	async function getProfile(_uid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.one('user', _uid).get();
			data.goods.forEach(function(goods) {
				try {
					goods.photo_path = JSON.parse(goods.photo_path);
				} catch (err) {
					goods.photo_path = '';
				}
			});
			data.myGoodsPending = data.goods.filter(function(g) { return g.exchanged === 0; });
			data.myGoodsExchanged = data.goods.filter(function(g) { return g.exchanged === 1; });
			
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

	async function getFavoriteSum(uid) {
		const defer = $q.defer();

		try {
			let data = await Restangular.all('star/by').getList({ starring_user_uid: uid });
			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	async function editProfile(profile) {
		const defer = $q.defer();

		try {
			profile.route = `user/${profile.uid}`;
			let data = await profile.put();

			defer.resolve(data);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function uploadHeadPhoto(profile) {
		$mdDialog.show({
			templateUrl: 'profile/headphotoModal.html',
			//clickOutsideToClose: true,
			controllerAs: 'vm',
			controller: HeadPhotoController,
			fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
			locals: {
				profile: profile
			}
		});

		/** @ngInject */
		function HeadPhotoController($state, $scope, profile, logger) {
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
					profile.photo_path = await upload();
					profile.route = 'user/photo';
					await profile.put();

					logger.success('更新成功', null, 'DONE');
				} catch (err) {
					exception.catcher('上傳失敗')(err);
				}
				onCancel();
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
