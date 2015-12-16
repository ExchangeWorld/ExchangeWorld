'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
const moment      = require('moment');

goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(
	auth,
	NgMap,
	goodData,
	AvailableCategory,
	goodsService,
	notification,
	colorThief,
	favorite,
	logger,
	$state,
	$stateParams,
	$scope,
	$rootScope,
	$localStorage,
	$location,
	$mdDialog,
	$window
) {
	const vm = this;

	vm.isLoggedIn        = Boolean($localStorage.user);
	vm.isMe              = vm.isLoggedIn && (goodData.owner_uid === $localStorage.user.uid);
	vm.goodData          = goodData;
	vm.availableCategory = AvailableCategory;
	vm.bgStyle           = '';
	vm.bordercolor       = ['',''];

	vm.comment         = '';
	vm.goodComments    = [];
	vm.onSubmitComment = onSubmitComment;
	vm.onDeleteComment = onDeleteComment;

	vm.stars       = [];
	vm.starred     = false;
	vm.edit        = false;
	vm.onEdit      = onEdit;
	vm.onDelete    = onDelete;
	vm.onClickStar = onClickStar;

	vm.queuingList   = [];
	vm.onClickQueue  = onClickQueue;

	vm.showPhotoViewer = showPhotoViewer;
	vm.onClickUser = $rootScope.onClickUser;
	vm.onClickBack = () => $window.history.go(-$rootScope.historyCounter);

	activate();

	$scope.removeMode = false;
	// $scope.$parent.$on('mapInitialized', mapInitialized);

	/* After map is loaded */
	NgMap.getMap().then(mapInitialized);
	function mapInitialized() {
		// console.log(goodData);
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.position_y, goodData.position_x);
	}

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.position_y, goodData.position_x);
		updateComment();
		updateStar();

		if ($localStorage.user) {
			vm.isMe = (goodData.owner_uid === $localStorage.user.uid);
		} else {
			vm.isMe = false;
			vm.isLoggedIn = false;
		}

		goodData.category_alias = _.result(_.find(AvailableCategory, 'label', goodData.category), 'alias');

		goodsService.getQueue($stateParams.gid)
			.then(function(data) {
				vm.queuingList = data;
			});

		var ct = new colorThief.ColorThief();
		var image = document.getElementById('img');
		image.onload = ()=> {
			var pallete = ct.getPalette(image, 2);
			vm.bgStyle = {
				"background-color": `rgb(${pallete[0][0]}, ${pallete[0][1]}, ${pallete[0][2]})`,
				"border-radius": "20px"
			};
			vm.bordercolor = [{
				"border": `rgb(${pallete[1][0]}, ${pallete[1][1]}, ${pallete[1][2]}) solid 2px`
			},{
				"border": `rgb(${pallete[2][0]}, ${pallete[2][1]}, ${pallete[2][2]}) solid 2px`
			}];
		};
	}

	function onEdit(gid) {
		if(vm.edit) {
			goodsService
				.editGood(gid, vm.goodData.name, vm.goodData.category, vm.goodData.description)
				.then(function(data) {
					goodData.category_alias = _.result(_.find(AvailableCategory, 'label', goodData.category), 'alias');
					logger.success('更新成功！', data, 'Edit');
				})
				.catch(function(err) { 
					logger.error('錯誤', err, 'Error');
				});
		}
		vm.edit = !vm.edit;
	}

	function onDelete(gid) {
		var confirm = $mdDialog.confirm()
			.title('刪除物品')
			.content('您確定要刪除這個物品嗎？')
			.ariaLabel('Delete Goods')
			.ok('確定')
			.cancel('取消')
			.targetEvent(gid);
		if (confirm) {
			$mdDialog.show(confirm).then(function() {
				goodsService
					.deleteGoods( gid )
					.then(function(data) {
						logger.success('刪除成功', data, 'DONE');
						$state.go('root.withSidenav.seek');
					});
			});
		}
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
					comment.timestamp = moment(comment.timestamp.slice(0, -1)).fromNow();
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
			notification
				.postNotification({
					sender_uid   : commentData.user_uid,
					receiver_uid : vm.goodData.owner_uid,
					trigger_url  : $location.url(),
					content      : '有人對你的物品留言',
				});
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
					trigger_url  : $location.url(),
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

	/**
	 * user use a goods to queue the host goods
	 */
	function onClickQueue(ev) {
		const types = ['want_to_queue', 'see_who_queue'];
		var type = vm.isMe ? 'see_who_queue' : 'want_to_queue';

		if(type === types[0]) {
			/**
			 * TODO:
			 *  1. restrict multi queue(?).
			 */
			$state.go('root.withSidenav.goods.queue', {}, {location:false});
		} else if(type === types[1]) {
			$state.go('root.withSidenav.goods.queuing',{}, {location:false});
		} else {
			$state.go('root.404');
		}
	}

	function showPhotoViewer(ev) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'goods/goods.photoViewer.html',
			controllerAs: 'vm',
			controller: popupController,
			locals: {
				photos: vm.goodData.photo_path
			}
		});
		function popupController($mdDialog, photos) {
			const vm = this;
			vm.photos = photos;
			vm.cancel = ()=> $mdDialog.cancel();
		}
	}
}


