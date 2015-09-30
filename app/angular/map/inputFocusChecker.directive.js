"use strict";

const mapModule  = require('./map.module');
mapModule.directive('focusChecker', focusChecker);

function focusChecker() {

	const directive = {
		restrict : 'A',
		link : link,
	};

	return directive;

	function link(scope, element, attr) {
		scope.$watchCollection(attr.focusChecker, function(newVal) {
			if (!newVal) {
				element[0].blur();
			}
		});
	}
}
