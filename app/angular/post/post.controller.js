'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $scope, $state, auth, AvailableCategory, logger, $localStorage, $mdDialog) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.imgEncoded        = [];
	vm.onSubmit          = onSubmit;
	vm.availableCategory = AvailableCategory;
	$scope.$on('positionMarked', positionMarked);

	////////////////

	function positionMarked(e, latLng) {
		vm.positionX = latLng.lng();
		vm.positionY = latLng.lat();

		console.log(vm.positionX);
		console.log(vm.positionY);
	}

	function onSubmit() {
		if(!$localStorage.user) {
			auth
				.login()
				.then(function(user) {
					vm.user = user;
					vm.isLoggedIn = Boolean(user);
					$state.reload();
				});
		} else {
			if(!vm.goodsCategory) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未選擇類別')
						.content('請選擇物品的種類.')
						.ok('Got it!')
					);
			} else if(!(vm.positionX && vm.positionY)) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未指定位置')
						.content('請在地圖側標定物品位置.')
						.ok('Got it!')
					);
			} else {
				/**
				 * First, upload photos and get photo_pathArray,
				 * then send new post data to backend
				 */
				postService
					.uploadImg(vm.imgEncoded)
					.then(function(data){
						postService
							.sendNewPostInfo({
								name        : vm.goodsName,
								description : vm.goodsDescriptions,
								category    : vm.goodsCategory.label,
								position_x  : vm.positionX,
								position_y  : vm.positionY,
								photo_path  : JSON.stringify(data),
								owner_uid   : auth.currentUser().uid,
							})
							.then(function(data) {
								logger.success('已成功發佈一項物品^_^', data, 'POST');
							});
					});
				$state.go('root.withSidenav.seek');
			}
		}
	}


}
