'use strict';

const meModule = require('./me.module');
const _             = require('lodash');
meModule.controller('MeController', MeController);

/** @ngInject */
function MeController(
	me,
	meService,
	auth,
	logger,
	message,
	$state,
	$stateParams,
	$rootScope,
	$localStorage,
	$timeout,
	$sce
) {
	var vm                 = this;
	vm.me             = me;
	vm.isMe                = $rootScope.isLoggedIn && (me.uid === $localStorage.user.uid);
	vm.myGoodsPending      = me.myGoodsPending;
	vm.myGoodsExchanged    = me.myGoodsExchanged;
	vm.getNumber           = number => new Array(number);
	vm.onClickGoods        = gid => $state.go('root.withSidenav.goods', { gid : gid });
	vm.editPhoto           = editPhoto;
	/////////////

	activate();

	function activate() {
		//TODO; use /api/user/me
		if ($localStorage.user) {
			vm.isMe = (me.uid === $localStorage.user.uid);
		} else {
			vm.isMe = false;
			$rootScope.isLoggedIn = false;
		}

	}

	function editPhoto() {
		if (!vm.isMe) return;

		meService.uploadHeadPhoto(me);
	}
}
