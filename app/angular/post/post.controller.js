'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostCtrl);

/** @ngInject */
function PostCtrl(postService, $state ) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.imgEncoded        = [];
	vm.onSubmit          = onsubmit;
	/**
	 * Need to get more info,
	 * goods position X & Y
	 *
	 */

	////////////////

	function onsubmit() {
		var newPost = {
			gname       : vm.goodsName,
			description : vm.goodsDescriptions,
			categories  : vm.goodsCategory.label,
			want        : '',
			posX        : 123.4,
			posY        : 23.5,
			ownerID     : '88776654'
		};
		

		postService.sendNewPostInfo(newPost);
		postService.uploadImg(vm.imgEncoded);

		$state.go('Seek');
	}


	/**
	 * define all avalible categories 
	 */
	vm.availableCategory = 
		[
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
