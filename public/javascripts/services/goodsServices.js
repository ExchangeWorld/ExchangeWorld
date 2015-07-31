"use strict";

angular
	.module('goodsServices', [])
	.factory('goodsServ', goodsserv);

function goodsserv($http) {
	var service = {
		get: getGoodsData
	};


	return service;

	//////////////

	function getGoodsData(callback, id) {
		$http.get('/goods?gid=' + id).success(function(data) {
			// prepare data here
			//console.log(data);
			callback(data);
		});
	}
}
