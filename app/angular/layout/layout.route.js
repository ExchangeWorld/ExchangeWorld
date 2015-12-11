"use strict";

const layoutModule = require('./layout.module');
layoutModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root',
			config : {
				abstract : true,
				templateUrl : 'layout/layout.html',
				onEnter: function($rootScope, $state, $window){
					$rootScope.onClickUser   = onClickUser;
					$rootScope.onClickFollow = onClickFollow;

					function onClickUser(uid) {
						if($window.innerWidth > 600) {
							$state.go('root.withSidenav.profile', { uid: uid });
						} else {
							$state.go('root.oneCol.m_profile', { uid: uid });
						}
					}

					function onClickFollow(uid, type) {
						if($window.innerWidth < 600) {
							$state.go('root.oneCol.m_follow', {
								uid: uid,
								type: type
							});
						} else {
							$state.go('root.withSidenav.follow', {
								uid: uid,
								type: type
							});
						}
					}
				}
			}
		},
		{
			state : 'root.withSidenav',
			config : {
				abstract : true,
				templateUrl: 'layout/withSidenav.html',
			},
		},
		{
			state : 'root.oneCol',
			config : {
				abstract : true,
				templateUrl: 'layout/oneColumn.html',
			},
		}
	];
}
