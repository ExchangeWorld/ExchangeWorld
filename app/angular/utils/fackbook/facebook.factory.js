'use strict';

const facebookModule = require('./facebook.module');

facebookModule.factory('facebookService', facebook);

/** @ngInject */
function facebook(Facebook, Restangular, $q, exception, $localStorage) {
	const service = {
		me,
		login,
		logout,
		register,
		getLoginStatus,
		getLargePicture,
	};

	return service;

	////////////////

	/**
	 * me()
	 * get user's facebook basic infomations 
	 * fields is an object like this:
	 * { fields: 'id, name, email, pictures' }
	 */
	function me(fields) {
		return Facebook.api('/me?', fields, function(response) {
			return response;
		});
	}

	/** Login */
	async function login() {
		let loginStatus = await getLoginStatus();
		if (loginStatus) {
			return me();
		} else {
			return Facebook.login(function(response) {
				if (response.status === 'connected') {
					return me();
				} else {
					//console.error('FB login ERROR.');
					return {};
				}
			});
		}
	}

	/** Logout */
	function logout() {
		return Facebook.logout();
	}

	async function register(user) {
		const defer = $q.defer();

		try {
			let [member, largePic] = await Promise.all([
				Restangular.oneUrl(`user?identity=${user.id}`).get(),
				getLargePicture(user.id)
			]);

			if (member) {
				let token = await Restangular.all('authenticate/login').post({ fb: true, identity: member.identity });
				$localStorage.token = token.token;
				Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'put', 'delete'], {
					token: $localStorage.token
				});

				defer.resolve(member);
				$localStorage.user = member;
				return defer.promise;
			}

			let userData = await me({ fields: 'id, name, email, picture' });
			let newUser = {
					fb         : true,
					identity   : userData.id,
					name       : userData.name,
					photo_path : largePic.data.url,
					email      : userData.email
				};

			let registerData = await Restangular.all('authenticate/register').post(newUser);
			let token = await Restangular.all('authenticate/login').post({ fb: true, identity: registerData.identity });
			$localStorage.token = token.token;
			Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'put', 'delete'], {
				token: $localStorage.token
			});

			$localStorage.user = registerData;
			defer.resolve(registerData);
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			defer.reject(err);
		}

		return defer.promise;
	}

	function getLargePicture(fbId) {
		return Facebook.api('/'+fbId+'/picture?width=320&height=320', function(response) {
			return response;
		});
	}

	/** get facebook login status */
	function getLoginStatus() {
		const defer = $q.defer();

		Facebook.getLoginStatus(function(response) {
			defer.resolve(response.status === 'connected');
		});

		return defer.promise;
	}

}
