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
		Restangular.all('api/post').post(newpost);
	}

	function uploadImg(img){
		Restangular.all('api/upload/image').post(img);
	}
}
