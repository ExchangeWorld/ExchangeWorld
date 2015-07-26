'use strict';

const exampleModule = require('./example.module');
exampleModule.directive('exampleDirective', exampleDirective);

/** @ngInject */
function exampleDirective() {

	return {
		restrict: 'EA',
		link: function(scope, element) {
			element.on('click', function() {
				console.log('element clicked');
			});
		}
	};

}