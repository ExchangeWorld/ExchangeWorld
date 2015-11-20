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
	scope.currentSlide   = 0;
	scope.isCurrentSlide = idx => idx === scope.currentSlide;
	scope.prevSlide      = prevSlide;
	scope.nextSlide      = nextSlide;

	function prevSlide(e) {
		e.preventDefault();
		e.stopPropagation();

		scope.currentSlide = scope.currentSlide > 0
			? --scope.currentSlide
			: scope.images.length - 1;
	}

	function nextSlide(e) {
		e.preventDefault();
		e.stopPropagation();

		scope.currentSlide = scope.currentSlide < scope.images.length - 1
			? ++scope.currentSlide
			: 0;
	}
}
