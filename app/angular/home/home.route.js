"use strict";

const homeModule = require('./home.module');
homeModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.home',
			config : {
				url : '/',
				templateUrl : 'home/home.html',
			}
		}
	];
}