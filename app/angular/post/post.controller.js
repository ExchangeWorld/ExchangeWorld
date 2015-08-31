'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $scope, $state, auth, AvailableCategory, logger) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.imgEncoded        = [];
	vm.onSubmit          = onSubmit;
	vm.availableCategory = AvailableCategory;
	$scope.$on('positionMarked', positionMarked);
	/**
	 * Need to get more info,
	 * goods position X & Y
	 *
	 */

	////////////////

	function positionMarked(e, latLng) {
		vm.positionX = latLng.lng();
		vm.positionY = latLng.lat();

		console.log(vm.positionX);
		console.log(vm.positionY);
	}

	function onSubmit() {

		/**
		 * First, upload the photo and get photo_path,
		 * then send new post data to backend
		 */
		postService
			.uploadImg(vm.imgEncoded)
			.then(function(data){
				console.log(data);
				postService
					.sendNewPostInfo({
						name        : vm.goodsName,
						description : vm.goodsDescriptions,
						category    : vm.goodsCategory.label,
						position_x  : vm.positionX,
						position_y  : vm.positionY,
						photo_path  : data,
						owner_uid   : auth.currentUser().uid,
					})
					.then(function(data) {
						logger.success('Your post successes :)', data, 'POST');
					});
			});

		$state.go('root.withSidenav.seek');
	}


}
