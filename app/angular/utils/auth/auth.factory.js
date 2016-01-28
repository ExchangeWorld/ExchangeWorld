'use strict';

const authModule = require('./auth.module');
const _          = require('lodash');
const co         = require('co');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q, $localStorage, $mdDialog, Restangular) {
	var token       = '';
	var currentUser = null;

	const service = {
		login,
		logout,
		fetchMe,
		isLoggedIn,
		getLoginState,
		currentUser : () => currentUser,
		showEmailBox,
	};
	return service;

	/////////////

	function login() {
		const defer = $q.defer();

		co(function *(){
			yield facebookService.login(); // login to facebook.
			let data = yield fetchMe();
			//let token = yield getAccessToken(data.id, null, true);//fetchMe();
			currentUser = data;
			defer.resolve(currentUser);
		});

		return defer.promise;
	}

	function logout() {
		const defer = $q.defer();

		co(function *(){
			yield facebookService.logout();
			currentUser = null;
			delete $localStorage.user;
			defer.resolve();
		});

		return defer.promise;
	}

	function fetchMe() {
		const defer = $q.defer();

		co(function *(){
			let response = yield facebookService.me({ fields: 'id' }); // get user facebook id.
			let userdata = yield facebookService.register(response); // Call API for create/get new EXWD user. 

			currentUser = userdata;
			defer.resolve(currentUser);
		});
		
		return defer.promise;
	}

	function isLoggedIn() {
		return Boolean(currentUser);
	}

	function getLoginState() {
		const defer = $q.defer();

		co(function *() {
			let state = yield facebookService.getLoginStatus();
			if(state) {
				currentUser = yield fetchMe();//data;

				// let user fill email if email is empty
				if(currentUser.email.length === 0) showEmailBox(currentUser);
			} else {
				currentUser = null;
			}
			defer.resolve(currentUser);
		});

		return defer.promise;
	}

	function getAccessToken(id, pwd, fb) {
		return Restangular
			.all('authenticate/login')
			.post({
				fb: fb,
				identity: id,
				password: pwd
			});
	}

	function showEmailBox(user) {
		$mdDialog.show({
			templateUrl : 'utils/auth/fillEmail.html',
			controllerAs : 'vm',
			controller : DialogController,
			locals : {
				user: user
			}
		});
	}
}

/** @ngInject */
function DialogController(user, profileService, $mdDialog, logger) {
	const vm  = this;
	vm.email = '';
	vm.cancel = onCancel;
	vm.submit = onSubmit;

	function onSubmit() {
		if(vm.email) {
			user.email = vm.email;
			profileService
				.editProfile(user)
				.then(() => {
					logger.success('更新成功！');
				});
		}
		$mdDialog.cancel();
	}

	function onCancel() {
		$mdDialog.cancel();
	}

}
