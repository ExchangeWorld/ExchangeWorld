'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profile, $state) {
	var vm         = this;
	vm.profile     = profile;
	vm.onClickUser = onClickUser;

	/////////////

	// define onClick event on goods owner
	function onClickUser(_uid) {
		$state.go('root.withSidenav.profile', { uid : _uid });
	}
}
