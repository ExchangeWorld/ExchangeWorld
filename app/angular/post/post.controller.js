'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(postService, $state) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.imgEncoded        = [];
	vm.onSubmit          = onSubmit;
	/**
	 * Need to get more info,
	 * goods position X & Y
	 *
	 */

	////////////////

	function onSubmit() {
		var newPost = {
			name        : vm.goodsName,
			description : vm.goodsDescriptions,
			category    : vm.goodsCategory.label,
			position_x  : 123.4,
			position_y  : 23.4,
			owner_uid   : '88776654',
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


	/**
	 * define all avalible categories 
	 */
	vm.availableCategory = [
			{label : "Books"},
			{label : "Textbooks"},
			{label : "Magazine"},
			{label : "Movies"},
			{label : "Music CD"},
			{label : "Video Game"},
			{label : "Smart Phone"},
			{label : "Tablet"},
			{label : "Camera"},
			{label : "Audio"},
			{label : "Computer Hardware"},
			{label : "Jewelry"},
			{label : "Clothing"},
			{label : "Shoes"},
			{label : "Watches"},
			{label : "Furniture"},
			{label : "Others"}
		];
}
