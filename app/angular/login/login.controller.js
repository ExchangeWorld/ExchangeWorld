'use strict';

const loginModule = require('./login.module');

loginModule.controller('LoginController', LoginController);

/** @ngInject */
function LoginController(
	auth,
	$state,
	$rootScope,
	$localStorage
) {
	const vm = this;
	vm.login = login;
	vm.form = {
		id: '',
		pwd: ''
	};



	function login(fb) {
		auth
			.login(fb, vm.form.id, vm.form.pwd)
			.then(function(user) {
				$rootScope.isLoggedIn = Boolean(user);
				$localStorage.user = user;

				$state.go('root.withSidenav.seek');
			});
	}
}
