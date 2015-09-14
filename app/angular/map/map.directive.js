"use strict";

const mapModule = require('./map.module');
mapModule.directive('mapBlock', mapBlock);

function mapBlock() {

	var directive = {
		restrict: 'E',
		scope: {},
		bindToController: true,
		controller: 'MapCtrl',
		controllerAs: 'vm',
		templateUrl: 'map/map.html'
	};

	return directive;
}
