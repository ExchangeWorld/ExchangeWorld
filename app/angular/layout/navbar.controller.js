"use strict";

const layoutModule = require('./layout.module');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($mdSidenav, $state, auth) {
	const vm      = this;
	const state   = ['home', 'seek', 'post', 'manage', 'profile'];
	vm.stateIndex = 0;
	vm.contentIs  = contentIs;
	vm.onClick    = onClick;
	vm.onLogin    = onLogin;
	vm.onLogout   = onLogout;
	vm.user       = {};
	vm.isLoggedIn = false;

	//////////////
	activate();

	function activate() {
		if(!vm.isLoggedIn) {
			auth
				.init()
				.then(function(data) {
					// using cache data
					vm.user = data;
					getLoginState();
				})
			    .then(function(){
					// check fb login state
					auth
						.getLoginState()
						.then(function(data) {
							vm.user = data;
							getLoginState();
						});
				});
		}
	}

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
				(!$mdSidenav('left').isOpen() || (
				$mdSidenav('left').isOpen() &&
				vm.stateIndex === contentIndex))
			) {
				$mdSidenav('left').toggle();
			}
		}
		vm.stateIndex = contentIndex;
	}

	function getLoginState(){
		vm.isLoggedIn = auth.isLoggedIn();
	}

	function onLogin() {
		auth
			.login()
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
