'use strict';

const postModule = require('./post.module');
postModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.withSidenav.post',
			config : {
				url : '/post',
				bindToController: true,
				controller : 'PostController',
				controllerAs: 'vm',
				templateUrl : 'post/post.html',
				title : 'post'
			}
		}
	];
}
