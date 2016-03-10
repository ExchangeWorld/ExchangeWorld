'use strict';

const layoutModule = require('./layout.module');

layoutModule.controller('NavbarController', NavbarController);

/** @ngInject */
function NavbarController(
	$mdSidenav,
	$mdMenu,
	$mdDialog,
	$state,
	$scope,
	$rootScope,
	$localStorage,
	$timeout,
	$window,
	$q,
	auth,
	message,
	logger,
	exception,
	notification,
	AppSettings
) {
	const vm    = this;
	vm.content             = $state.current.title;
	vm.contentIs           = (title)=> { return title === vm.content; };
	vm.openMenu            = openMenu;
	vm.closeMenu           = ()=> $mdMenu.hide();
	vm.report              = report;
	vm.menu                = menu;
	vm.onLogout            = onLogout;
	vm.notifications       = [];
	vm.messages            = [];
	vm.unread              = [0, 0];
	vm.onClickNotification = onClickNotification;
	vm.onClickMessage      = onClickMessage;


	//////////////

	// reTake access token 
	//$interval(function() {
	//auth.getAccessToken($localStorage.user.identity, null, true);
	//}, 1140000);


	activate();

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		vm.content = toState.title;
		console.log(vm.content);
	});
	$scope.$on('chatroom:msgNew', ()=> { 
		logger.success('你有新訊息', null, 'NEWS');
		$timeout(()=> { updateNews(); });
	});
	$scope.$on('chatroom:msgRead', ()=> { 
		$timeout(()=> { updateNews(); });
	});
	$scope.$on('notify:notifyRead', ()=> { 
		$timeout(()=> { updateNews(); });
	});

	async function activate() {
		$rootScope.isLoggedIn = Boolean($localStorage.user);
		if ($rootScope.isLoggedIn) $rootScope.user = $localStorage.user;

		await updateNews();
	}

	function openMenu($mdOpenMenu, e) {
		vm.closeMenu();
		e.preventDefault();
		e.stopPropagation();
		$mdOpenMenu(e);
	}

	function menu(type) {
		const isFromOneCol = $state.includes("root.oneCol");

		switch (type) {
			case 'seek':
			case 'post':
				$state.go(`root.withSidenav.${type}`);
				break;

			case 'profile':
			case 'exchange':
				$state.go(`root.oneCol.${type}`, {
					uid: $localStorage.user.uid 
				});
				break;

			case 'home':
			case 'login':
			case 'signup':
			case 'm_messagebox':
			case 'm_notification':
				$state.go(`root.oneCol.${type}`);
				break;

			default:
				$state.go('404');
				break;
		}
		
		if ( 
			!isFromOneCol && 
			(!$mdSidenav('left').isOpen() || ($mdSidenav('left').isOpen() && vm.contentIs(type)))
		) {
			$mdSidenav('left').toggle();
		}

		vm.closeMenu();
	}

	function onLogout() {
		auth
			.logout()
			.then(function(){
				$state.go('root.oneCol.home');
				$localStorage.user = null;
			});
	}

	function onClickNotification(notice) {
		notification.click(notice);
		if(!$state.includes("root.oneCol") && !$mdSidenav('left').isOpen() ) {
			$mdSidenav('left').toggle();
		}
		vm.closeMenu();
	}

	function onClickMessage(msg, ev) {
		message.showMessagebox(ev, msg, msg);
		vm.closeMenu();
	}

	async function updateNews() {
		if (!$rootScope.isLoggedIn) return;
		
		try {
			[vm.messages, vm.notifications] = await Promise.all([
				message.getMessageList(),
				notification.getNotification()
			]);
			vm.unread = [
				vm.messages.filter((m)=> { return !m.read; }).length,
				vm.notifications.filter((n)=> { return !n.read; }).length
			];

			let unread = vm.unread[0] + vm.unread[1];
			$rootScope.pageTitle = (unread) ? `(${unread}) ${AppSettings.appTitle}` : AppSettings.appTitle;
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
		}
	}

	function report() {
		var confirm = $mdDialog.confirm()
			.title('回報問題')
			.textContent(
				'有發現BUG嗎?有什麼建議想跟我們說的嗎?歡迎回報各種想法給我們吧!')
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
