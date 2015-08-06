'use strict';

const profileModule = require('./profile.module');
profileModule.controller('ProfileController', ProfileCtrl);

/** @ngInject */
function ProfileCtrl($scope, profileService, $stateParams) {
	var vm           = this;
	vm.profileData   = [];
	//vm.onClickUser = onClickUser;
	//console.log($routeParams.gid);

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
//10202592687218268
	// define onClick event on goods owner
	function onClickUser(fb_id) {
		window.location.href = "#/profile/" + fb_id;
	}
}
