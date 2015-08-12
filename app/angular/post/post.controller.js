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
			gname       : vm.goodsName,
			description : vm.goodsDescriptions,
			categories  : vm.goodsCategory.label,
			want        : '',
			posX        : 123.4,
			posY        : 23.5,
			ownerID     : '88776654',
			photo_path  : '',
		};
		

		newPost.photo_path = postService.uploadImg(vm.imgEncoded);
		postService.sendNewPostInfo(newPost);

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
