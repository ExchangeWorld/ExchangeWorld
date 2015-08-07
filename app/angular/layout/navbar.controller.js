"use strict";

const layoutModule = require('./layout.module');
layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController($mdSidenav) {
	const vm = this;
	vm.contentIs = contentIs;
	vm.onClick = onClick;

	function setContent(contentIndex) {
		//	vm.content = ContentType[contentIndex];
		//	vm.contentHistory.push(vm.content);
	}

	function contentIs(contentIndex) {
		return vm.content === ContentType[contentIndex];
	}

	function onClick(contentIndex) {
		//$scope.content = ContentType[contentIndex];
		//$scope.$emit('sidenavChanged', ContentType[contentIndex]);
		console.log('Click');
		$mdSidenav('left').toggle();
	}
}
