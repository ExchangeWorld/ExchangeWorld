'use strict';

const postModule = require('./post.module');
postModule.service('postService', postService);

/** @ngInject */
function postService(Restangular, $q) {
	var service = {
		sendNewPostInfo,
		uploadImg,
	};

	return service;

	//////////

	function sendNewPostInfo(newpost) {
		const defer = $q.defer();
		Restangular
			.all('/goods/post')
			.post(newpost)
			.then(function(data) {
				data 
				? defer.resolve(data)
				: defer.reject(data);
			})
			.catch(function(error) {
				return exception.catcher('[Post Service] uploadImg error: ')(error);
			});
		return defer.promise;
	}

	function uploadImg(img) {
		const defer = $q.defer();

		Restangular
			.all('/upload/image')
			.post(img)
			.then(function(data) {
				if (data !== undefined ) {
					defer.resolve(data);
				} 
			})
			.catch(function(error) {
				return exception.catcher('[Post Service] uploadImg error: ')(error);
			});

		return defer.promise;
	}
}
