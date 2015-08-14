"use strict";

const layoutModule = require('./layout.module');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($scope, $mdSidenav, $state, auth) {
	const vm     = this;
	const state  = ['home', 'seek', 'post', 'manage', 'profile'];
	vm.contentIs = contentIs;
	vm.onClick   = onClick;
	vm.onLogin   = onLogin;
	vm.onLogout  = onLogout;
	vm.username  = 'hi';

	$scope.$watch(auth.isLoggedIn, function(logined) {
		var user = auth.currentUser();
		//console.log(user);
		vm.username = user.name;
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

	function onLogin() {
		auth.login();
	}

	function onLogout() {
		auth.logout();
	}

}
