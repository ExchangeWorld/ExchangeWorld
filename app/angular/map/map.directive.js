"use strict";

const mapModule = require('./map.module');
mapModule.directive('mapBlock', mapBlock);

function mapBlock() {
	var directive = {
		restrict: 'E',
		bindToController: true,
		controller: 'MapCtrl as am',
		templateUrl: 'map/map.html'
	};

	return directive;
}