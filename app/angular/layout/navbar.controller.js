'use strict';

const layoutModule = require('./layout.module');
const _            = require('lodash');
const moment       = require('moment');

layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController(
	$mdSidenav,
	$mdMenu,
	$mdDialog,
	$state,
	$rootScope,
	$localStorage,
	$location,
	$window,
	$q,
	auth,
	message,
	notification,
	AppSettings
) {
	const vm               = this;
	const state            = [
		'home',
		'seek',
		'post',
		'exchange',
		'profile',
		'm_messagebox',
		'm_notification'
	];
	vm.stateIndex          = _.indexOf(state, $state.current.title);
	vm.contentIs           = function(idx) { return vm.stateIndex === idx; };
	vm.openMenu            = openMenu;
	vm.closeMenu           = ()=> $mdMenu.hide();
	vm.report              = report;
	vm.onClick             = onClick;
	vm.onLogin             = onLogin;
	vm.onLogout            = onLogout;
	vm.user                = $localStorage.user;
	vm.isLoggedIn          = Boolean($localStorage.user);
	vm.notifications       = [];
	vm.unreadMsg           = '';
	vm.unreadNotify        = '';
	vm.onClickNotification = onClickNotification;
	vm.messages            = [];
	vm.onClickMessage      = onClickMessage;


	//////////////

	$rootScope.$on('$stateChangeSuccess', function() {
		updateNotification();
	});

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

	function openMenu($mdOpenMenu, e) {
		vm.closeMenu();
		e.preventDefault();
		e.stopPropagation();
		$mdOpenMenu(e);
    }

	function onClick(contentIndex) {
		if ([0, 5, 6].indexOf(contentIndex) !== -1) {
			$state.go('root.oneCol.' + state[contentIndex]);
		} else if(contentIndex === 3) {
			if (!$localStorage.user) onLogin();
			else  $state.go('root.oneCol.' + state[contentIndex], {uid: vm.user.uid});
		} else {
			const isFromOneCol = $state.includes("root.oneCol");

			if(contentIndex === 4) {
				$rootScope.onClickUser($localStorage.user.uid);
			} else if (
				contentIndex === 1 &&
				$state.includes("root.withSidenav.goods") ||
				$state.includes("root.oneCol.goods")
			) {
				$state.go('root.withSidenav.' + state[contentIndex]);
			} else {
				$state.go('root.withSidenav.' + state[contentIndex]);
			}
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
		vm.stateIndex = contentIndex;
		vm.closeMenu();
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
		notification.updateNotification(notice, false);

		$location.path(notice.trigger_url);
		if(!$state.includes("root.oneCol") && !$mdSidenav('left').isOpen() ) {
			$mdSidenav('left').toggle();
		}
	}

	function onClickMessage(msg, ev) {
		message.showMessagebox(ev, msg, updateNotification);

		message
			.updateMessage(msg)
			.then(updateNotification);
	}


	function updateNotification() {
		if(vm.isLoggedIn) {
			$q
				.all([
					notification.getNotification(vm.user.uid),
					message.getMessage(vm.user.uid),
				])
				.then(function(data) {
					data[0].map(function(notice) {
						notice.timestamp = moment(notice.timestamp.slice(0, -1)).fromNow();
					});
					vm.notifications = data[0];

					vm.messages = _.unique(data[1], 'sender_uid');
					vm.messages.forEach(function(msg) {
						msg.timestamp = moment(msg.timestamp.slice(0, -1)).calendar();
					});

					vm.unreadNotify = _.filter(vm.notifications, {unread : true}).length;
					vm.unreadMsg = _.filter(vm.messages, {unread : true}).length;

					var unread = vm.unreadMsg + vm.unreadNotify;
					if(unread) $rootScope.pageTitle = `(${unread}) ${AppSettings.appTitle}`;
					else $rootScope.pageTitle = AppSettings.appTitle;
				});
		}
	}

	function report() {
		var confirm = $mdDialog.confirm()
			.title('回報問題')
			.content([
				'<ul>',
				'<li>有發現BUG嗎?</li>',
				'<li>有什麼建議想跟我們說的嗎?</li>',
				'<li>歡迎回報各種想法給我們吧!</li>',
				'<ul>'
			].join(''))
			.ariaLabel('report')
			.ok('確定')
			.cancel('取消');
		if (confirm) {
			$mdDialog
				.show(confirm)
				.then(function() {
					$window.open('https://goo.gl/csRLdh', '_blank');
				});
		}
	}
}
