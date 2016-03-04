'use strict';

const m_messageModule = require('./m_message.module');
m_messageModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.oneCol.m_message',
			config : {
				url : '/m_message/:cid',
				bindToController: true,
				controller : 'm_messageController',
				controllerAs: 'vm',
				templateUrl : 'mobile/m_message/m_message.html',
			}
		}
	];
}
