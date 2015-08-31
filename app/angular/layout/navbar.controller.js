"use strict";

const layoutModule = require('./layout.module');
const _ = require('lodash');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($mdSidenav, $state, auth, $localStorage) {
	const vm      = this;
	const state   = ['home', 'seek', 'post', 'exchange', 'profile'];
	vm.stateIndex = _.indexOf(state, $state.current.title);
	vm.onClick    = onClick;
	vm.onLogin    = onLogin;
	vm.onLogout   = onLogout;
	vm.user       = $localStorage.user;
	vm.isLoggedIn = Boolean($localStorage.user);

	//////////////
	activate();

	function activate() {
		auth
			.getLoginState()
			.then(function(data) {
				vm.user = data;
				vm.isLoggedIn = Boolean(data);
			});
	}


	function onClick(contentIndex) {
		//$scope.content = ContentType[contentIndex];
		//$scope.$emit('sidenavChanged', ContentType[contentIndex]);
		if (contentIndex === 0 || contentIndex === 3) {
			$state.go('root.oneCol.' + state[contentIndex]);
		} else if(contentIndex === 4) {
			$state.go('root.withSidenav.' + state[contentIndex], {
				uid: auth.currentUser().uid
			});
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
				!isFromOneCol &&
				(
					!$mdSidenav('left').isOpen() || (
					$mdSidenav('left').isOpen() &&
					vm.stateIndex === contentIndex)
				)
			) {
				$mdSidenav('left').toggle();
			}
		}
		vm.stateIndex = contentIndex;
	}

	function onLogin() {
		auth
			.login()
			.then(function(user) {
				vm.user = user;
				vm.isLoggedIn = Boolean(user);
				$state.reload();
			});
	}

	function onLogout() {
		auth.logout();
		vm.user = null;
		vm.isLoggedIn = false;
		$state.reload();
	}

}
