"use strict";

const scrollModule = require('./scroll.module');
scrollModule.directive('scroll', scrollBottom);

function scrollBottom() {

	const directive = {
		restrict : 'A',
		link : link,
	};

	return directive;

	function link(scope, element, attr) {
		scope.$watchCollection(attr.scroll, function (newValue) {
			//console.log(newValue);
			if (newValue) {
				element[0].scrollTop = element[0].scrollHeight;
			}
		});
	}
}
