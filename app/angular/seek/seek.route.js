'use strict';

const seekModule = require('./seek.module');
seekModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.withSidenav.seek',
			config : {
				url : '/seek?olc&z&name&cate&g',
				bindToController: true,
				controller : 'SeekController',
				controllerAs: 'vm',
				templateUrl: 'seek/seek.html',
				title : 'seek',
				/** @ngInject */
				onEnter: ($rootScope)=> {
					$rootScope.historyCounter = 0;
				}
			},
		}
	];
}
