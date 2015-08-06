'use strict';

const postModule = require('./post.module');
postModule.controller('PostController', PostCtrl);

/** @ngInject */
function PostCtrl($scope, postService, $stateParams) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodsCategory     = '';
	vm.onSubmit          = onsubmit;
	/**
	 * Need to get more info,
	 * goods position X & Y
	 *
	 */

	////////////////

	function onsubmit() {
		var newPost = {
			goodsName         : vm.goodsName,
			goodsDescriptions : vm.goodsDescriptions,
			goodsCategory     : vm.goodsCategory.label
		};
		console.log(newPost);
		//alert('submitted!');
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
