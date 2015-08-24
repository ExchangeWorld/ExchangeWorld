'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(goodData, goodsService, $state, auth) {
	const vm           = this;
	vm.goodData        = goodData;
	vm.goodCommentData = [];
	vm.onClickUser     = onClickUser;
	vm.onSubmitComment = onSubmitComment;
	vm.comment         = '';
	vm.newComments     = [];

	activate();

	function activate() {
		goodsService
			.getComment(vm.goodData.gid)
			.then(function(data) {
				vm.goodCommentData = data;
				//console.log(data);
			});
	}

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', { uid : uid });
	}

	function onSubmitComment() {
		if (vm.comment) {
			vm.newComments.push({
				commenter_uid : auth.currentUser().uid,
				goods_gid     : goodData.gid,
				content       : this.comment,
				date          : 'just now',
				user_uid      : auth.currentUser().uid,
				name          : auth.currentUser().name,
				photo_path    : auth.currentUser().photo_path,
			});
			vm.comment = '';
		}
		//console.log(vm.newComments);
		goodsService.postComment(vm.newComments[vm.newComments.length - 1]);
	}
}
