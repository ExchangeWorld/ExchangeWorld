'use strict';

const m_messageModule = require('./m_messagebox.module');
m_messageModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.oneCol.m_messagebox',
			config : {
				url : '/m_messagebox',
				bindToController: true,
				controller : 'm_messageboxController',
				controllerAs: 'vm',
				templateUrl : 'mobile/m_messagebox/m_messagebox.html',
			}
		}
	];
}
