"use strict";

angular
	.module('NavbarController', ['ngRoute'])
	.directive('navbar', navbar)
	.controller('DropdownCtrl', dropdownctrl)
	.controller('NavbarCtrl', navbarctrl);


function navbar() {
	return {
		restrict: 'E',
		templateUrl: "views/navbar.html"
	};
}

function dropdownctrl($scope) {
	var vm            = this;
	vm.status         = { isopen: false };
	vm.toggleDropdown = toggledropdown;

	/////////////////
	
	function toggledropdown($event) {
		$event.preventDefault();
		$event.stopPropagation();
		vm.status.isopen = !vm.status.isopen;
	}
}

function navbarctrl($scope, $mdSidenav, $route) {
	var vm            = this;
	vm.contentHistory = {};
	vm.setContent     = setcontent;
	vm.contentIs      = contentis;
	vm.onClick        = onclick;

	/////////////////
	
	var ContentType = ["home", "seek", "post", "manage", "profile", "good"];
	$scope.$on('$routeChangeSuccess', function() {
		var url = $route.current.templateUrl;
		if (url !== undefined)
			vm.content = url.split('/')[1].split('.')[0];
	});

	function setcontent (contentIndex) {
		vm.content = ContentType[contentIndex];
		vm.contentHistory.push(vm.content);
	}

	function contentis (contentIndex) {
		return vm.content === ContentType[contentIndex];
	}

	function onclick (contentIndex) {
		vm.content = ContentType[contentIndex];
		$scope.$emit('sidenavChanged', ContentType[contentIndex]);
		$mdSidenav('left').toggle();
	}

}

