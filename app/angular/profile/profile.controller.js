'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(profileService, $stateParams, $state) {
	var vm         = this;
	vm.profileData = [];
	vm.onClickUser = onClickUser;

	activate();

	/////////////

	function activate() {
		// get data from profileServices.js
		profileService.getProfileData($stateParams.fid)
			.then(function(data){
				//promise fulfilled (successed)
				vm.profileData = data;
			}).catch(function(error){
				//promise rejected (failed)
				console.log('error', error);
			});
	}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		$state.go('root.profile', {fid: fb_id});
	}
}
