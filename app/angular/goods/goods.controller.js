'use strict';

const goodsModule = require('./goods.module');
const moment      = require('moment');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, goodsService, $state, $scope, auth, $timeout, $localStorage) {
	const vm           = this;
	vm.goodData        = goodData;
	vm.goodCommentData = [];
	vm.onClickUser     = onClickUser;
	vm.onSubmitComment = onSubmitComment;
	vm.onDeleteComment = onDeleteComment;
	vm.comment         = '';
	vm.newComments     = [];

	activate();

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$timeout(function() {
			$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
		}, 50);
		updateComment();
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
				vm.newComments     = [];
			})
			.then(function() {
				var data = vm.goodCommentData.map(function(obj) {
					obj.isMe = (obj.commenter_uid === $localStorage.user.uid);
					obj.timestamp = moment(obj.timestamp).fromNow();
					return obj;
				});
				vm.goodCommentData = data;
			});
	}

	function onSubmitComment() {
		if(!auth.currentUser()) {
			alert('您未登入喔！');
			return;
		}
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
			vm.newComments.push(commentData);
			goodsService
				.postComment(commentData)
				.then(function() {
					vm.comment = '';
					updateComment();
				});
		}
		//console.log(vm.newComments);
	}

	function onDeleteComment(cid) {
		//SweetAlert.swal("Here's a message");
		if(confirm('您確定真的要刪除這則留言嗎？') == true) {
			goodsService.deleteComment({ cid: cid });
			updateComment();
		}
	}
}
