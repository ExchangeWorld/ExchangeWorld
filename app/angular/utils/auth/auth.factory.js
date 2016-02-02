'use strict';

const authModule = require('./auth.module');

authModule.factory('auth', auth);

/** @ngInject */
function auth(facebookService, $q, $localStorage, $mdDialog, Restangular) {
	var currentUser = null;

	const service = {
		login,
		logout,
		fetchMe,
		isLoggedIn,
		getLoginState,
		showEmailBox,
		currentUser: () => currentUser,
	};
	return service;

	/////////////

	async function login() {
		const defer = $q.defer();

		//TODO: login with id, password
		await facebookService.login(); // login to facebook.
		currentUser = await fetchMe();
		defer.resolve(currentUser);

		return defer.promise;
	}

	async function logout() {
		const defer = $q.defer();

		await facebookService.logout();
		currentUser = null;
		$localStorage.user = {};
		defer.resolve(null);

		return defer.promise;
	}

	async function fetchMe() {
		const defer = $q.defer();

		let response = await facebookService.me({ fields: 'id' }); // get user facebook id.
		currentUser = await facebookService.register(response); // Call API for create/get new EXWD user. 

		defer.resolve(currentUser);

		return defer.promise;
	}

	function isLoggedIn() {
		return Boolean(currentUser);
	}

	async function getLoginState() {
		const defer = $q.defer();

		let state = await facebookService.getLoginStatus();
		currentUser = state ? await fetchMe() : null;

		// let user fill email if email is empty
		if (currentUser && currentUser.email.length === 0) showEmailBox(currentUser);

		defer.resolve(currentUser);

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
			templateUrl: 'utils/auth/fillEmail.html',
			controllerAs: 'vm',
			controller: DialogController,
			locals: {
				user: user
			}
		});
	}
}

/** @ngInject */
function DialogController(user, profileService, $mdDialog, logger) {
	const vm = this;
	vm.email = '';
	vm.cancel = onCancel;
	vm.submit = onSubmit;

	function onSubmit() {
		if (vm.email) {
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
