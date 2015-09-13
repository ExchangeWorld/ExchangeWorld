'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $scope, $state, auth, AvailableCategory, logger, $localStorage) {
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
							logger.success('Your post successes :)', data, 'POST');
						});
				});
			$state.go('root.withSidenav.seek');
		}
	}


}
