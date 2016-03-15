'use strict';

const meModule = require('./me.module');
meModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

var resolve = {
	/** @ngInject */
	me: function (meService) {
		return meService
			.getProfile()
			.then(function(data) { 
				return data; 
			})
			.catch(function() {
				return {};
			});
	},
};

function getStates() {
	return [
		{
			state : 'root.oneCol.me',
			config : {
				url : '/me',
				bindToController: true,
				controller : 'MeController',
				controllerAs: 'vm',
				templateUrl : 'me/me.html',
				resolve : resolve,
			}
		}
	];
}
