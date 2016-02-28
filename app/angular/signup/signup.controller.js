'use strict';

const signupModule = require('./signup.module');

signupModule.controller('SignupController', SignupController);

/** @ngInject */
function SignupController(
	auth,
	exception,
	$state,
	$scope,
	$rootScope,
	$localStorage,
	$mdDialog
) {
	const vm = this;
	vm.closePopup = closePopup;
	vm.goLogin = goLogin;
	vm.signup = signup;
	vm.signupFb = signupFb;
	vm.form = {
		id: '',
		name: '',
		pwd: '',
		pwd2: ''
	};

	async function signup() {
		if (!checkForm()) {
			return;
		}

		try {
			let user = await auth.signup(vm.form);
			$rootScope.isLoggedIn = Boolean(user);
			$localStorage.user = user;
			$rootScope.user = user;

			$state.go('root.withSidenav.seek');
			closePopup();
		} catch (err) {
			if (err.data.error === 'Email is wrong') exception.catcher('信箱格式有誤喔')(err);
			else exception.catcher('唉呀出錯了！')(err);
		}
	}

	async function signupFb() {
		try {
			let user = await auth.login(true);
			$rootScope.isLoggedIn = Boolean(user);
			$localStorage.user = user;

			$state.go('root.withSidenav.seek');
			closePopup();
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
		}
	}

	function goLogin() {
		if ($scope.instance) {
			$mdDialog.hide();
			$rootScope.openLoginModal();
		} else {
			$state.go('root.oneCol.login');
		}
	}

	function checkForm() {
		if (!vm.form.id || !vm.form.name || !vm.form.pwd) {
			exception.catcher('欄位不可留白！')();
			return false;
		}

		if (vm.form.pwd !== vm.form.pwd2) {
			exception.catcher('密碼不一致！')();
			return false;
		}

		if (vm.form.pwd.length < 4) {
			exception.catcher('密碼需大於4字！')();
			return false;
		}

		return true;
	}

	function closePopup() {
		if ($scope.instance) $mdDialog.hide();
	}
}
