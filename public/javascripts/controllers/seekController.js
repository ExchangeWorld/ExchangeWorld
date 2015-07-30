"use strict";

angular
	.module('SeekController', ['seekServices'])
	.controller('SeekCtrl', seekCtrl);

function seekCtrl($scope, seekServ) {
	var vm          = this;
	vm.goods        = [];
	vm.onClickGoods = onClickGoods;

	// Use seekServices.js to get data from backend
	seekServ.get(function(data){ vm.goods = data; });

	// goods onClick event: change route to corrsponding gid
	function onClickGoods(gid) {
		window.location.href = "#/seek/" + gid;
	}
}
