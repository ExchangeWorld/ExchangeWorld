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
	vm.myRequest        = [];
	vm.myGoodsPending   = me.myGoodsPending;
	vm.myGoodsExchanged = me.myGoodsExchanged;
	vm.onClickFollow    = (uid, type)=> $state.go('root.oneCol.follow', { uid, type});
	vm.getNumber        = number => new Array(number);
	vm.onClickGoods     = gid => $state.go('root.withSidenav.goods', { gid });
	vm.onClickFollow    = (uid, type)=> $state.go('root.oneCol.follow', { uid, type });
	vm.editPhoto        = editPhoto;
	vm.rateExchange     = rateExchange;
	vm.acceptRequest    = acceptRequest;

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

		vm.myExchanges = await meService.getExchanges($localStorage.user.uid);
		vm.myRequest = await meService.getMyRequest();
	}

	function editPhoto() {
		meService.uploadHeadPhoto(me);
	}

	function rateExchange(ev, idx) {
		meService
			.showCompleteExchange(ev, vm.myExchanges[idx], ()=> { 
				$state.reload();
			});
	}

	function acceptRequest(idx) {
		meService
			.acceptRequest(vm.selected, vm.myRequest[idx].gid)
			.then(function(data) {
				logger.success('成功接受一個排', null, 'DONE');
				$state.reload();
			});
	}
}
