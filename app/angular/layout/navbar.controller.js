"use strict";

const layoutModule = require('./layout.module');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($mdSidenav, $state, facebookService) {
	const vm      = this;
	const state   = ['home', 'seek', 'post', 'manage', 'profile'];
	vm.stateIndex = 0;
	vm.contentIs  = contentIs;
	vm.onClick    = onClick;
	vm.onLogin    = onLogin;
	vm.onLogout   = onLogout;

	function setContent(contentIndex) {
		//	vm.content = state[contentIndex];
		//	vm.contentHistory.push(vm.content);
	}

	function contentIs(contentIndex) {
		return vm.stateIndex === state[contentIndex];
	}

	function onClick(contentIndex) {
		//$scope.content = ContentType[contentIndex];
		//$scope.$emit('sidenavChanged', ContentType[contentIndex]);
		if (contentIndex === 0) {
			$state.go('root.oneCol.' + state[contentIndex]);
		} else {
			const isFromOneCol = $state.includes("root.oneCol");
			$state.go('root.withSidenav.' + state[contentIndex]);

			/**
			 * When need to toggle the sidenav
			 * 1. iff sidenav exists
			 * 2. sidenav is close
			 * 3. click the current content again
			 */

			if (
				//!$mdSidenav('left').isLockedOpen() &&
				!isFromOneCol &&
				(!$mdSidenav('left').isOpen() || (
				$mdSidenav('left').isOpen() &&
				vm.stateIndex === contentIndex
				))

			) {
				$mdSidenav('left').toggle();
			}
		}
		vm.stateIndex = contentIndex;
	}

	function onLogin() {
		facebookService
			.login() // login to facebook.
			.then(function(data) {
				console.log(data);

				facebookService
					.me() // get user facebook data.
					.then(function(data) {
						console.log(data);
					});
			});
		/**
		 * Here should call API for create new user.
		 *
		 */

	}

	function onLogout() {
		facebookService.logout();
	}

}
