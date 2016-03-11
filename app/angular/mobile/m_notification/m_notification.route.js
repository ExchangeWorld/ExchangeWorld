'use strict';

const m_notificationModule = require('./m_notification.module');
m_notificationModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.oneCol.m_notification',
			config : {
				url : '/m_notification',
				title: 'm_notification',
				bindToController: true,
				controller : 'm_notificationController',
				controllerAs: 'vm',
				templateUrl : 'mobile/m_notification/m_notification.html',
			}
		}
	];
}
