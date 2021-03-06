"use strict";

const layoutModule = require('./layout.module');
layoutModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [{
		state: 'root',
		config: {
			abstract: true,
			templateUrl: 'layout/layout.html',
			onEnter: setGlobalFunc
		}
	}, {
		state: 'root.withSidenav',
		config: {
			abstract: true,
			templateUrl: 'layout/withSidenav.html',
		},
	}, {
		state: 'root.oneCol',
		config: {
			abstract: true,
			templateUrl: 'layout/oneColumn.html',
		},
	}];
}

/** @ngInject */
function setGlobalFunc($rootScope, $state, $window, message, $mdDialog, $mdMedia, $mdSidenav) {
	$rootScope.historyCounter = 1;
	$rootScope.onClickUser = onClickUser;
	$rootScope.onClickFollow = onClickFollow;
	$rootScope.openSignupModal = openSignupModal;
	$rootScope.openLoginModal = openLoginModal;
	$rootScope.onSwipeLeft = onSwipeLeft;

	function onClickUser(uid) {
		$state.go('root.oneCol.profile', {
			uid: uid
		});
	}

	function onClickFollow(uid, type) {
		if ($window.innerWidth > 600) {
			$state.go('root.withSidenav.follow', {
				uid: uid,
				type: type
			});
		} else {
			$state.go('root.oneCol.m_follow', {
				uid: uid,
				type: type
			});
		}
	}

	function openSignupModal() {
		let fullscreen = ($mdMedia('sm') || $mdMedia('xs'));
		let mdScope = $rootScope.$new();
		mdScope.instance = $mdDialog.show({
			templateUrl: 'signup/signup.html',
			controllerAs: 'vm',
			controller: 'SignupController',
			clickOutsideToClose: true,
			fullscreen: fullscreen,
			scope: mdScope
		});
	}

	function openLoginModal() {
		let fullscreen = ($mdMedia('sm') || $mdMedia('xs'));
		let mdScope = $rootScope.$new();
		mdScope.instance = $mdDialog.show({
			templateUrl: 'login/login.html',
			controllerAs: 'vm',
			controller: 'LoginController',
			clickOutsideToClose: true,
			fullscreen: fullscreen,
			scope: mdScope
		});
	}

	function onSwipeLeft() {
		if ($mdSidenav('left').isOpen()) {
			$mdSidenav('left').toggle();
		}
	}
}
