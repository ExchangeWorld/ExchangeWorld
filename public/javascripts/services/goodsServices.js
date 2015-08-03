"use strict";

angular
	.module('goodsServices', [])
	.factory('goodsServ', goodsserv);

function goodsserv(Restangular) {
	var service = {
		getGoodsData: getGoodsData
	};


	return service;

	//////////////

	function getGoodsData(id) {
		var goods = Restangular.all('goods');

		// GET /goods?gid=id
		return goods.getList({ 'gid':id }).then(function(data) {
			return data;
		}, function(error) {
			console.log('error', error);
		});
	}
}
