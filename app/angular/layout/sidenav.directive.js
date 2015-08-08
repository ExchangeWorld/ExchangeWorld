"use strict";

const layoutModule = require('./layout.module');
layoutModule.directive('sidenav', sidenavDirective);

function sidenavDirective() {

	const directive = {
		restrict : 'E',
		transclude : true,
		templateUrl : 'layout/sidenav.html',
		scope : {},
		controller : sidenavController,
		controllerAs : 'vm',
		bindToController: true,
	};

	return directive;
}

function sidenavController($mdSidenav) {
	const vm = this;
	vm.closeMenu = closeMenu;

	function closeMenu() {
		$mdSidenav('left').close();
	}
}
