'use strict';

const postModule = require('./post.module');
postModule.service('postService', postService);

/** @ngInject */
function postService(Restangular, $q) {
	var service = {
		sendNewPostInfo : sendNewPostInfo,
		uploadImg       : uploadImg,
	};

	return service;

	//////////

	function sendNewPostInfo(newpost){
		Restangular.all('/goods/post').post(newpost);
	}

	function uploadImg(img){
		return Restangular.all('/upload/image').post(img);
	}
}
