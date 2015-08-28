'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, goodsService, $state, $stateParams, $scope, auth, $timeout, $localStorage) {
	const vm           = this;
	vm.isLoggedIn      = Boolean($localStorage.user);
	vm.isMe            = vm.isLoggedIn && (goodData.owner_uid === $localStorage.user.uid);
	vm.goodData        = goodData;
	vm.starred         = false;
	vm.starbtnStr      = vm.starred ? 'UNSTAR' : 'STAR';
	vm.starsCount      = goodData.stars.length;
	vm.goodCommentData = [];
	vm.comment         = '';
	vm.onSubmitComment = onSubmitComment;
	vm.onClickUser     = onClickUser;
	vm.onClickStar     = onClickStar;

	activate();

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$timeout(function() {
			$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
		}, 50);
		updateComment();

		if(vm.isLoggedIn) {
			if (_.findWhere(goodData.stars, { starring_user_uid : $localStorage.user.uid })) {
				setStarbtnStr(true); 
			}
		}
		auth
			.getLoginState()
			.then(function(data) {
				if(data) {
					vm.isMe = (goodData.owner_uid === data.uid);
				} else {
					vm.isMe = false;
					vm.isLoggedIn = false;
				}
			});
	}

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', { uid : uid });
	}

	function updateComment() {
		goodsService
			.getComment(vm.goodData.gid)
			.then(function(data) {
				vm.goodCommentData = data;
			});
	}

	function onSubmitComment() {
		const mesg = vm.comment.trim();
		if (mesg) {
			const commentData = {
				commenter_uid : auth.currentUser().uid,
				goods_gid     : goodData.gid,
				content       : mesg,
				date          : 'just now',
				user_uid      : auth.currentUser().uid,
				name          : auth.currentUser().name,
				photo_path    : auth.currentUser().photo_path,
			};
			vm.goodCommentData.push(commentData);
			goodsService
				.postComment(commentData)
				.then(function() {
					vm.comment = '';
					updateComment();
				});
		}
		//console.log(vm.newComments);
	}

	function onClickStar() {
		const star = {
			starring_user_uid : $localStorage.user.uid,
			goods_gid         : vm.goodData.gid,
		};
		
		if(!vm.starred) {
			vm.starsCount += 1;
			goodsService
				.postStar(star)
				.then(function() {
					setStarbtnStr(true);
				});
		} else {
			vm.starsCount -= 1;
			goodsService
				.deleteStar(star)
				.then(function() {
					setStarbtnStr(false);
				});
		}
		
		
	}

	function setStarbtnStr(starred) {
		vm.starred = starred;
		vm.starbtnStr = starred ? 'UNSTAR' : 'STAR';
	}
}
