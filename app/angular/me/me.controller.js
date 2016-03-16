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
	$scope,
	$stateParams,
	$rootScope,
	$localStorage
) {
	var vm              = this;
	vm.me               = me;
	vm.myExchanges      = [];
	vm.myGoodsPending   = me.myGoodsPending;
	vm.myGoodsExchanged = me.myGoodsExchanged;
	vm.onClickFollow    = (uid, type)=> $state.go('root.oneCol.follow', { uid, type});
	vm.getNumber        = number => new Array(number);
	vm.onClickGoods     = gid => $state.go('root.withSidenav.goods', { gid : gid });
	vm.editPhoto        = editPhoto;
	vm.rateExchange     = rateExchange;

	activate();

	$scope.$watch('vm.idx', function(current, old) {
		if (current === undefined) return;
		$state.go(`root.oneCol.me.tab${current+1}`);
	});

	async function activate() {
		if ($state.current.name.indexOf('tab') !== -1) {
			vm.idx = parseInt($state.current.name.split('tab')[1], 10) - 1;
		}
		if (!$localStorage.user) {
			$rootScope.isLoggedIn = false;
			$state.reload();
		}

		vm.myExchanges = await meService.getExchanges(me.uid);
	}

	function editPhoto() {
		if (!vm.isMe) return;

		meService.uploadHeadPhoto(me);
	}

	function rateExchange(ev, idx) {
		meService
			.showCompleteExchange(ev, vm.myExchanges[idx], ()=> { 
				$state.reload();
			});
	}
}
