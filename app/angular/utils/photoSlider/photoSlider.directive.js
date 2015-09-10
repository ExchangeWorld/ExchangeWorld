'use strict';

const photoSliderModule = require('./photoSlider.module');

/** @ngInject */
photoSliderModule.directive('photoslider', photoSliderDirective);

function photoSliderDirective() {

	const directive = {
		restrict: 'AE',
		replace: true,
		scope: {
			images: '='
		},
		link: function (scope, elem, attrs) {
			scope.currentSlide   = 0;
			scope.isCurrentSlide = function(idx) { return idx === scope.currentSlide; };
			scope.prevSlide      = prevSlide;
			scope.nextSlide      = nextSlide;

			function prevSlide() {
				scope.currentSlide = (scope.currentSlide < scope.images.length - 1) ? ++scope.currentSlide : 0;
			}

			function nextSlide() {
				scope.currentSlide = (scope.currentSlide > 0) ? --scope.currentSlide : scope.images.length - 1;
			}
		},
		templateUrl : 'utils/photoSlider/photoSlider.html',
	};

	return directive;
}

