
"use strict";

const seekModule = require('./seek.module');
seekModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'SEEK',
			config : {
				url : '/seek',
				bindToController: true,
				controller : 'SeekCtrl',
				controllerAs: 'vm',
				templateUrl : 'seek/seek.html',
				title : 'seeeeeeeeeeeeek'
			}
		}
	];
}
