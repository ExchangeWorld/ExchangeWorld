"use strict";

angular
	.module('goodsServices', [])
	.factory('goodsServ', goodsserv);

function goodsserv($http) {
	var service = {
		getGoodsData: getGoodsData
	};


	return service;

	//////////////

	function getGoodsData(id) {
		return $http.get('/goods?gid=' + id)
			.then(function(response) {
				if (typeof response.data === 'object') {
					return response.data;
				} else {
					// invalid response
					return $q.reject(response.data);
				}

			}, function(response) {
				// something went wrong
				return $q.reject(response.data);
			});
	}
}
