'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $state, AvailableCategory, $scope) {
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
		var newPost = {
			name        : vm.goodsName,
			description : vm.goodsDescriptions,
			category    : vm.goodsCategory.label,
			position_x  : 123.4,
			position_y  : 23.4,
			owner_uid   : '12345',
			photo_path  : '',
		};
		

		/**
		 * First, upload the photo and get photo_path,
		 * then send new post data to backend
		 */
		postService
			.uploadImg(vm.imgEncoded)
			.then(function(data){
				newPost.photo_path = data;

				postService.sendNewPostInfo(newPost);
			});

		$state.go('root.withSidenav.seek');
	}


}
