'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
const moment      = require('moment');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(
	goodData,
	goodsService,
	$state,
	$stateParams,
	$scope,
	auth,
	$timeout,
	$localStorage
) {
	const vm           = this;

	vm.isLoggedIn      = Boolean($localStorage.user);
	vm.isMe            = vm.isLoggedIn && (goodData.owner_uid === $localStorage.user.uid);
	vm.goodData        = goodData;

	vm.comment         = '';
	vm.goodComments    = [];
	vm.onClickUser     = onClickUser;
	vm.onSubmitComment = onSubmitComment;
	vm.onDeleteComment = onDeleteComment;

	vm.stars           = [];
	vm.starred         = false;
	vm.onClickStar     = onClickStar;

	vm.onClickUser     = onClickUser;

	activate();

	$scope.$parent.$on('mapInitialized', mapInitialized);

	/* After map is loaded */
	function mapInitialized(e, evtMap) {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
	}

	function activate() {
		updateComment();
		updateStar();

		auth
			.getLoginState()
			.then(function(data) {
				if (data) {
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
				vm.goodComments = data;
				vm.newComments  = [];
			})
			.then(function() {
				var data = vm.goodComments.map(function(comment) {
					if(vm.isLoggedIn)
						comment.isMe = (comment.commenter_uid === $localStorage.user.uid);
					comment.timestamp = moment(comment.timestamp).fromNow();
					return comment;
				});
				vm.goodComments = data;
			});
	}

	function onSubmitComment() {
		if(!auth.currentUser()) {
			auth
				.login()
				.then(function(user) {
					vm.user = user;
					vm.isLoggedIn = Boolean(user);
					$state.reload();
				});
		}
		const mesg = vm.comment.trim();
		if (mesg) {
			const commentData = {
				commenter_uid : auth.currentUser().uid,
				goods_gid     : goodData.gid,
				content       : mesg,
				date          : moment().startOf('second').fromNow(),
				user_uid      : auth.currentUser().uid,
				name          : auth.currentUser().name,
				photo_path    : auth.currentUser().photo_path,
			};
			vm.goodComments.push(commentData);
			goodsService
				.postComment(commentData)
				.then(function() {
					vm.comment = '';
					updateComment();
				});
		}
	}

	function onDeleteComment(cid) {
		if (confirm('您確定真的要刪除這則留言嗎？')) {
			goodsService
				.deleteComment({ cid: cid })
				.then(updateComment);
		}
	}

	function onClickStar() {
		const star = {
			starring_user_uid : $localStorage.user.uid,
			goods_gid         : vm.goodData.gid,
		};

		if (!vm.starred) {
			goodsService
				.postStar(star)
				.then(function() {
					updateStar();
				});
		} else {
			goodsService
				.deleteStar(star)
				.then(function() {
					updateStar();
				});
		}
	}

	function updateStar() {
		goodsService
			.getStars(vm.goodData.gid)
			.then(function(data) {
				vm.stars = data;

				if (
					vm.isLoggedIn &&
					_.findWhere(data, { starring_user_uid : $localStorage.user.uid })
				) {
					vm.starred = true;
				} else {
					vm.starred = false;
				}
			});
	}
}
