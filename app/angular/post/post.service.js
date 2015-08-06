'use strict';

const postModule = require('./post.module');
postModule.service('postService', postService);

/** @ngInject */
function postService(Restangular, $q) {
	//var service = {
		//getPostData: asyncGetData 
	//};

	//return service;

	//////////

	//function asyncGetData(fid) {
		//var deferred = $q.defer();

		//setTimeout(function() {
			/** 
			 * code for reject condictions 
			 */

			//deferred.resolve(getPostData(fid));
		//}, 1000);

		//return deferred.promise;
	//}

	//function getPostData(id) {
		//var post = Restangular.all('api/post');

		//// GET /post?fid=id
		//return post.getList({ 'fid':id }).then(function(data) {
			//return data;
		//}).catch(function(error) {
			//console.log('error', error);
		//});
	//}
}
