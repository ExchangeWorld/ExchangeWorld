'use strict';

const m_notificationModule = require('./m_notification.module');

m_notificationModule.controller('m_notificationController', m_notificationController);

/** @ngInject */
function m_notificationController(
	notification,
	$state,
	$rootScope,
	$timeout,
	$localStorage
) {
	const vm               = this;
	vm.notifications       = [];
	vm.onClickNotification = onClickNotification;
	vm.loading             = false;

	activate();

	async function activate() {
		vm.loading = true;
		if(!$localStorage.user) {
			$state.go('root.404');
			return;
		}

		try {
			vm.notifications = await notification.getNotification($localStorage.user.uid);
			$timeout(()=> { vm.loading = false; });
		} catch (err) {
			console.error(err);
		}
	}

	function onClickNotification(idx) {
		$rootScope.$broadcast('notify:notifyRead', idx);
	}

}
