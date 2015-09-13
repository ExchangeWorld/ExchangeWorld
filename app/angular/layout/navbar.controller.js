'use strict';

const layoutModule = require('./layout.module');
const _            = require('lodash');
const moment       = require('moment');

layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController(
	$mdSidenav,
	$state,
	$localStorage,
	$interval,
	$location,
	$rootScope,
	$q,
	auth,
	message,
	notification,
	AppSettings
) {
	const vm               = this;
	const state            = ['home', 'seek', 'post', 'exchange', 'profile'];
	vm.stateIndex          = _.indexOf(state, $state.current.title);
	vm.contentIs           = function(idx) { return vm.stateIndex === idx; };
	vm.onClick             = onClick;
	vm.onLogin             = onLogin;
	vm.onLogout            = onLogout;
	vm.user                = $localStorage.user;
	vm.isLoggedIn          = Boolean($localStorage.user);

	vm.notifications       = [];
	vm.unreadCount         = '';
	vm.onClickNotification = onClickNotification;

	vm.messages       = [];
	vm.onClickMessage = onClickMessage;

	//////////////
	activate();

	function activate() {
		auth
			.getLoginState()
			.then(function(data) {
				vm.user = data;
				vm.isLoggedIn = Boolean(data);
			});

		updateNotification();
	}

	function onClick(contentIndex) {
		if (contentIndex === 0) {
			$state.go('root.oneCol.' + state[contentIndex]);
		} else if(contentIndex === 3) {
			$state.go('root.oneCol.' + state[contentIndex], {uid: vm.user.uid});
		} else if(contentIndex === 4) {
			$state.go('root.withSidenav.' + state[contentIndex], {
				uid: auth.currentUser().uid
			});
		} else {

			const isFromOneCol = $state.includes("root.oneCol");
			$state.go('root.withSidenav.' + state[contentIndex]);

			/**
			 * When need to toggle the sidenav
			 * 1. iff sidenav exists
			 * 2. sidenav is close
			 * 3. click the current content again
			 */
			if (
				!isFromOneCol &&
				( !$mdSidenav('left').isOpen() || ( $mdSidenav('left').isOpen() && vm.stateIndex === contentIndex))
			) {
				$mdSidenav('left').toggle();
			}
		}
			// if(contentIndex === vm.stateIndex) {
			// 	$state.reload();
			// }
		vm.stateIndex = contentIndex;
	}

	function onLogin() {
		auth
			.login()
			.then(function(user) {
				vm.user = user;
				vm.isLoggedIn = Boolean(user);
				$state.reload();
			});
	}

	function onLogout() {
		auth
			.logout()
			.then(function(){
				$state.reload();
			});
		vm.user = null;
		vm.isLoggedIn = false;
	}

	function onClickNotification(notice) {
		notification
			.updateNotification(notice, false)
			.then(function(data) {
				console.log(data);
			});
		//console.log(notice);
		$location.path ( notice.trigger);
	}

	function onClickMessage(msg, ev) {
		message.showMessagebox(ev, msg, updateNotification);

		message
			.updateMessage(msg)
			.then(updateNotification);
	}


	var timer = $interval(updateNotification, 5000);
	function updateNotification() {
		if(vm.isLoggedIn) {
			$q
				.all([
					notification.getNotification(vm.user.uid),
					message.getMessage(vm.user.uid),
				])
				.then(function(data) {
					data[0].map(function(notice) {
						notice.timestamp = moment(notice.timestamp).fromNow();
					});
					vm.notifications = data[0];

					vm.messages = _.unique(data[1], 'sender_uid');
					vm.messages.forEach(function(msg) {
						msg.timestamp = moment(msg.timestamp).calendar();
					});

					vm.unreadCount = _.filter(vm.notifications.concat(vm.messages), {unread : true}).length;
					if(vm.unreadCount) $rootScope.pageTitle = `(${vm.unreadCount}) ${AppSettings.appTitle}`;
					else $rootScope.pageTitle = AppSettings.appTitle;
				});
		}
	}
}
