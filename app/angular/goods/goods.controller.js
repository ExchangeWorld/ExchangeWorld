'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
const moment      = require('moment');
goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(
	goodData,
	AvailableCategory,
	goodsService,
	notification,
	favorite,
	$state,
	$stateParams,
	$scope,
	auth,
	$timeout,
	$localStorage,
	$location,
	$mdDialog,
	$window
) {
	const vm = this;

	vm.isLoggedIn = Boolean($localStorage.user);
	vm.isMe       = vm.isLoggedIn && (goodData.owner_uid === $localStorage.user.uid);
	vm.goodData   = goodData;
	vm.availableCategory   = AvailableCategory;

	vm.comment         = '';
	vm.goodComments    = [];
	vm.onClickUser     = onClickUser;
	vm.onSubmitComment = onSubmitComment;
	vm.onDeleteComment = onDeleteComment;

	vm.stars       = [];
	vm.starred     = false;
	vm.edit        = false;
	vm.onEdit      = onEdit;
	vm.onClickStar = onClickStar;

	vm.myGoods       = [];
	vm.queuingList   = [];
	//vm.queued      = false;
	vm.onClickQueue  = onClickQueue;

	vm.onClickUser = onClickUser;
	vm.onClickBack = () => $window.history.back();

	activate();

	$scope.removeMode = false;
	$scope.$parent.$on('mapInitialized', mapInitialized);

	/* After map is loaded */
	function mapInitialized(e, evtMap) {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
	}

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.gid);
		updateComment();
		updateStar();

		/**
		 * if is me, get the queue list on this goods
		 * else, get all my goods that available to send queue request.
		 */
		if(vm.isLoggedIn) {
			if (vm.isMe) getQueuing();
			else getMyGoods();
		}

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

	function onEdit(gid) {
		if(vm.edit) {
			goodsService
				.editGood(gid, vm.goodData.name, vm.goodData.category, vm.goodData.description)
				.then(function(data) {
					console.log(data);
				})
				.catch(function(err){ console.log(err); });
		}
		vm.edit = !vm.edit;
	}

	// define onClick event on goods owner
	function onClickUser(uid) {
		$state.go('root.withSidenav.profile', {
			uid: uid
		});
	}

	function updateComment() {
		goodsService
			.getComment(vm.goodData.gid)
			.then(function(data) {
				vm.goodComments = data;
				vm.newComments = [];
			})
			.then(function() {
				var data = vm.goodComments.map(function(comment) {
					if (vm.isLoggedIn)
						comment.isMe = (comment.commenter_uid === $localStorage.user.uid);
					comment.timestamp = moment(comment.timestamp).fromNow();
					return comment;
				});
				vm.goodComments = data;
			});
	}

	function onSubmitComment() {
		if (!auth.currentUser()) {
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

			/**
			 * Send notification to host
			 */
			//console.log($location.url());
			notification
				.postNotification({
					sender_uid   : commentData.user_uid,
					receiver_uid : vm.goodData.owner_uid,
					trigger      : $location.url(),
					content      : '有人對你的物品留言',
				})
			.then(function(data){console.log(data);});
		}
	}

	function onDeleteComment(cid) {
		var confirm = $mdDialog.confirm()
			.title('刪除留言')
			.content('您確定要刪除這則留言嗎？')
			.ariaLabel('Delete Comment')
			.ok('確定')
			.cancel('取消')
			.targetEvent(cid);
		if (confirm) {
			$mdDialog.show(confirm).then(function() {
				goodsService
					.deleteComment({
						cid: cid
					})
					.then(updateComment);
			});
		}
	}

	function onClickStar() {
		const star = {
			starring_user_uid: $localStorage.user.uid,
			goods_gid: vm.goodData.gid,
		};

		if (!vm.starred) {
			favorite
				.postFavorite(star)
				.then(function() {
					updateStar();
				});

			notification
				.postNotification({
					sender_uid   : star.starring_user_uid,
					receiver_uid : vm.goodData.owner_uid,
					trigger      : $location.url(),
					content      : '有人關注你的物品',
				});

		} else {
			favorite
				.deleteFavorite(star)
				.then(function() {
					updateStar();
				});
		}
	}

	function updateStar() {
		favorite
			.getFavorites(vm.goodData.gid)
			.then(function(data) {
				vm.stars = data;

				if (
					vm.isLoggedIn &&
					_.findWhere(data, {
						starring_user_uid: $localStorage.user.uid
					})
				) {
					vm.starred = true;
				} else {
					vm.starred = false;
				}
			});
	}

	function getQueuing() {
		goodsService
			.getQueue(vm.goodData.gid)
			.then(function(data) {
				vm.queuingList = data;

				/**
				 * TODO: check if user already queued
				 */
				if (vm.isLoggedIn) {
					vm.queued = true;
				} else {
					vm.queued = false;
				}
			});
	}

	/**
	 * get all goods that available to queue this goods
	 */
	function getMyGoods() {
		goodsService
			.getUserGoods($localStorage.user.uid)
			.then(function(myGoods) {
				vm.myGoods = myGoods;
			});
	}

	/**
	 * user use a goods to queue the host goods
	 */
	function onClickQueue(ev, type) {
		const types = ['want_to_queue', 'see_who_queue'];

		if(type === types[0]) {
			/**
			 * TODO:
			 *  1. restrict multi queue(?).
			 */
			goodsService.showQueueBox(ev, vm.myGoods, goodData.gid, goodData.owner_uid);
		} else if(type === types[1]) {
			goodsService.showQueuingBox(ev, vm.queuingList, goodData.gid);
		} else {
			$state.go('root.withSidenav.404');
		}
	}
}
