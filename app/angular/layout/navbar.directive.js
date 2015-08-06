"use strict";

const layoutModule = require('./layout.module');
layoutModule.directive('navbar', navbarDirective);

function navbarDirective() {

	const directive = {
		restrict: 'E',
		templateUrl: 'layout/navbar.html',
		bindToController: true,
		controller: 'NavbarController',
		controllerAs: 'vm'
	};

	return directive;
}
