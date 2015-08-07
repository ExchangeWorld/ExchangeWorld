'use strict';

const postModule = require('./post.module');
postModule.service('postService', postService);

/** @ngInject */
function postService(Restangular, $q) {
	var service = {
		sendNewPost: sendNewPost 
	};

	return service;

	//////////

	function sendNewPost(newpost){
		Restangular.all('api/post').post(newpost);
	}
}
