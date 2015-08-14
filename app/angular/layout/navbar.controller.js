"use strict";

const layoutModule = require('./layout.module');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($mdSidenav, $state, auth) {
	const vm      = this;
	const state   = ['home', 'seek', 'post', 'manage', 'profile'];
	vm.contentIs  = contentIs;
	vm.onClick    = onClick;
	vm.onLogin    = onLogin;
	vm.onLogout   = onLogout;
	vm.user       = {};
	vm.isLoggedIn = false;

	//////////////
	//activate();
	auth.init()
		.then(function(data) {
			vm.user = data;
			getLoginState();
		});

	function setContent(contentIndex) {
		//	vm.content = state[contentIndex];
		//	vm.contentHistory.push(vm.content);
	}

	function contentIs(contentIndex) {
		return vm.content === state[contentIndex];
	}

	function onClick(contentIndex) {
		//$scope.content = ContentType[contentIndex];
		//$scope.$emit('sidenavChanged', ContentType[contentIndex]);
		if (contentIndex === 0) {
			$state.go('root.oneCol.' + state[contentIndex]);
		} else {
			const isFromOneCol = $state.includes("root.oneCol");
			$state.go('root.withSidenav.' + state[contentIndex]);

			if (!isFromOneCol) {
				$mdSidenav('left').toggle();
			}
		}
	}

	function getLoginState(){
		vm.isLoggedIn = auth.isLoggedIn();
	}

	function onLogin() {
		auth.login()
			.then(function(user) {
				vm.user = user;
				getLoginState();
			});
	}

	function onLogout() {
		auth.logout();
		vm.user = {};
		getLoginState();
	}

}
