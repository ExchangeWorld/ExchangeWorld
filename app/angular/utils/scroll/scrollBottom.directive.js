"use strict";

const scrollModule = require('./scroll.module');
scrollModule.directive('scrollBottom', scrollBottom);

function scrollBottom() {

	const directive = {
		restrict : 'A',
		scope: {
			scrollBottom: "="
		},
		link : link,
	};

	return directive;

	function link(scope, element) {
		scope.$watchCollection('scrollBottom', function (newValue) {
			if (newValue) {
				$(element).scrollTop($(element)[0].scrollHeight);
			}
		});
	}
}
