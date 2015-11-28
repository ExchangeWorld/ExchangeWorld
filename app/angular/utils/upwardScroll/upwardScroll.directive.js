"use strict";

const upwardsScollModule = require('./upwardScroll.module');
upwardsScollModule.directive('upwardScroll', upwardScroll);

/** @ngInject */
function upwardScroll($timeout) {
	return function(scope, elem, attr, ctrl) {
			var raw = elem[0];

			elem.bind('scroll', function() {
				if (raw.scrollTop <= 0) {
					var sh = raw.scrollHeight;
					scope
						.$apply(attr.upwardScroll)
						.then(()=> {
							$timeout(function() {
								elem[0].scrollTop = raw.scrollHeight - sh;
							});
						});
				}
			});

			//scroll to bottom
			//$timeout(function() {
				//scope.$apply(function() {
					//elem[0].scrollTop = raw.scrollHeight;
				//});
			//}, 0);
	};
}
