"use strict";

angular
	.module('seekController', ['seekServices'])
	.controller('seekCtrl', seekCtrl);

function seekCtrl($scope, seekServ) {
	const vm        = this;
	vm.goods        = [];
	vm.onClickGoods = onClickGoods;

	// Use seekServices.js to get data from backend
	seekServ.get(function(data){ vm.goods = data; });

	// goods onClick event: change route to corrsponding gid
	function onClickGoods(gid) {
		window.location.href = "#/seek/" + gid;
	}
}
