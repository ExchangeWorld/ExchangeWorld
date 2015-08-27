'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $state, auth, AvailableCategory, logger) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.imgEncoded        = [];
	vm.onSubmit          = onSubmit;
	vm.availableCategory = AvailableCategory;
	/**
	 * Need to get more info,
	 * goods position X & Y
	 *
	 */

	////////////////

	function onSubmit() {
		
		/**
		 * First, upload the photo and get photo_path,
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
						position_x  : 123.4,
						position_y  : 23.4,
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
