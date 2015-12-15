'use strict';

const m_notificationModule = require('./m_notification.module');
const _                    = require('lodash');
const moment               = require('moment');

m_notificationModule.controller('m_notificationController', m_notificationController);

/** @ngInject */
function m_notificationController(
	notification,
	$state,
	$location,
	$mdSidenav,
	$localStorage
) {
	const vm               = this;
	vm.notifications       = [];
	vm.onClickNotification = onClickNotification;
	vm.loading             = false;

	activate();

	function activate() {
		vm.loading = true;
		if(!$localStorage.user) {
			$state.go('root.404');
		} else {		
			notification
				.getNotification($localStorage.user.uid)
				.then(function(data) {
					vm.notifications = data.map(function(notice) {
						notice.timestamp = moment(notice.timestamp.slice(0, -1)).fromNow();
						return notice;
					});
					vm.loading = false;
				});
		}
	}

	function onClickNotification(notice) {
		notification.updateNotification(notice, false);
		
		$location.path(notice.trigger_url);
		if(!$state.includes("root.oneCol") && !$mdSidenav('left').isOpen() ) {
			$mdSidenav('left').toggle();
		}
	}

}
