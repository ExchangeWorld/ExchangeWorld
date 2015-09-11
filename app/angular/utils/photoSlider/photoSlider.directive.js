'use strict';

const photoSliderModule = require('./photoSlider.module');

/** @ngInject */
photoSliderModule.directive('photoslider', photoSliderDirective);

function photoSliderDirective() {

	const directive = {
		restrict: 'AE',
		replace: true,
		templateUrl: 'utils/photoSlider/photoSlider.html',
		link: photoSliderPostLink,
		scope: {
			images: '='
		},
	};
	return directive;
}

function photoSliderPostLink(scope) {
	//console.log(scope.images.length);
	scope.currentSlide   = 0;
	scope.isCurrentSlide = function(idx) { return idx === scope.currentSlide; };
	scope.prevSlide      = prevSlide;
	scope.nextSlide      = nextSlide;

	function prevSlide(e) {
		scope.currentSlide = (scope.currentSlide < scope.images.length - 1) ? ++scope.currentSlide : 0;
		e.preventDefault();
		e.stopPropagation();
	}

	function nextSlide(e) {
		scope.currentSlide = (scope.currentSlide > 0) ? --scope.currentSlide : scope.images.length - 1;
		e.preventDefault();
		e.stopPropagation();
	}
}
