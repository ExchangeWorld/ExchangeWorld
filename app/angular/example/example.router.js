"use strict";

const exampleModule = require('./example.module');
exampleModule.run(appRun);
//console.log('dsad');

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'Home',
			config : {
				url : '/',
				controller : 'ExampleCtrl as vm',
				templateUrl : 'example/example.html',
				title : 'Home'
			}
		}
	];
}