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
	function onClickUser(fb_id) {
		$state.go('root.withSidenav.profile', { fid : fb_id });
	}
}
