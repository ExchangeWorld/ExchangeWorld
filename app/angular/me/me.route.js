'use strict';

const meModule = require('./me.module');
meModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

var resolve = {
	/** @ngInject */
	me: function(meService) {
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
	return [{
		state: 'root.oneCol.me',
		config: {
			url: '/me',
			bindToController: true,
			controller: 'MeController',
			controllerAs: 'vm',
			templateUrl: 'me/me.html',
			resolve: resolve,
		}
	}, {
		state: 'root.oneCol.me.tab1',
		config: {
			url: '/star',
			templateUrl: 'me/tabs/tab1.html',
		}
	}, {
		state: 'root.oneCol.me.tab2',
		config: {
			url: '/goods',
			templateUrl: 'me/tabs/tab2.html',
		}
	}, {
		state: 'root.oneCol.me.tab3',
		config: {
			url: '/exchanged',
			templateUrl: 'me/tabs/tab3.html',
		}
	}, {
		state: 'root.oneCol.me.tab4',
		config: {
			url: '/request',
			templateUrl: 'me/tabs/tab4.html',
		}
	}, {
		state: 'root.oneCol.me.tab5',
		config: {
			url: '/history',
			templateUrl: 'me/tabs/tab5.html',
		}
	}];
}
