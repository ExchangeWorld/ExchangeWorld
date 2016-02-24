'use strict';

const goodsModule = require('./goods.module');
const _           = require('lodash');
const moment      = require('moment');
const marked      = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: false,
	tables: false,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: false,
	smartypants: false
});


goodsModule.controller('GoodsController', GoodsController);

/** @ngInject */
function GoodsController(
	auth,
	NgMap,
	goodData,
	comments,
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
	$timeout,
	$window,
	$sce
) {
	const vm = this;

	vm.isMe              = $rootScope.isLoggedIn && (goodData.owner_uid === $localStorage.user.uid);
	vm.goodData          = goodData;
	vm.goodDesc          = $sce.trustAsHtml(marked(goodData.description));
	vm.availableCategory = AvailableCategory;
	vm.bgStyle           = '';
	vm.bordercolor       = ['',''];

	vm.comment         = '';
	vm.goodComments    = comments;
	vm.onSubmitComment = onSubmitComment;
	vm.onDeleteComment = onDeleteComment;

	vm.stars       = [];
	vm.edit        = false;
	vm.onEdit      = onEdit;
	vm.onDelete    = onDelete;
	vm.onClickStar = onClickStar;

	vm.queuingList   = [];
	vm.onClickQueue  = onClickQueue;

	vm.showPhotoViewer = showPhotoViewer;
	vm.onClickBack = onClickBack;

	vm.getGoodsDescription = getGoodsDescription;
	activate();

	$scope.removeMode = false;
	// $scope.$parent.$on('mapInitialized', mapInitialized);

	/* After map is loaded */
	NgMap.getMap().then(mapInitialized);
	function mapInitialized() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.position_y, goodData.position_x);
		$scope.$parent.$broadcast('markGoodViewed', goodData.gid);
	}

	function activate() {
		$scope.$parent.$broadcast('goodsChanged', [goodData]);
		$scope.$parent.$broadcast('mapMoveTo', goodData.position_y, goodData.position_x);
		$scope.$parent.$broadcast('markGoodViewed', goodData.gid);
		
		updateComment();
		updateStar();

        //TODO: use /api/user/me
		if ($localStorage.user) {
			vm.isMe = (goodData.owner_uid === $localStorage.user.uid);
		} else {
			vm.isMe = false;
			$rootScope.isLoggedIn = false;
		}

		goodData.category_alias = _.result(_.find(AvailableCategory, 'label', goodData.category), 'alias');

		goodsService
			.getQueue($stateParams.gid)
			.then(function(data) {
				vm.queuingList = data;
			});

		getBackgroundColor();
	}

	function onEdit(gid) {
		vm.edit = !vm.edit;
		if(vm.edit) return;

		let newValue = {
			gid         : gid,
			name        : vm.goodData.name,
			category    : vm.goodData.category,
			description : vm.goodData.description
		};

		goodsService
			.editGood(newValue) 
			.then(function(data) {
				goodData.category_alias = _.result(_.find(AvailableCategory, 'label', goodData.category), 'alias');
				logger.success('更新成功！', data, 'Edit');
				$state.reload();
			})
			.catch(function(err) { 
				logger.error('錯誤', err, 'Error');
			});
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
					if ($rootScope.isLoggedIn)
						comment.isMe = (comment.commenter_uid === $localStorage.user.uid);
					comment.timestamp = moment(comment.created_at.slice(0, -1)).fromNow();
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
					$rootScope.isLoggedIn = Boolean(user);
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
					.deleteComment({ cid: cid })
					.then(updateComment);
			});
		}
	}

	function onClickStar() {
		const star = {
			starring_user_uid: $localStorage.user.uid,
			goods_gid: vm.goodData.gid,
		};

		if (!vm.goodData.starredByUser) {
			favorite
				.postFavorite(star)
				.then(function() {
					vm.goodData.starredByUser = true;
				});
		} else {
			favorite
				.deleteFavorite(star)
				.then(function() {
					vm.goodData.starredByUser = false;
				});
		}
	}

	function updateStar() {
		favorite
			.getFavorites(vm.goodData.gid)
			.then(function(data) {
				vm.stars = data;
			});
	}

	/**
	 * user use a goods to queue the host goods
	 */
	function onClickQueue() {
		const types = ['want_to_queue', 'see_who_queue'];
		var type = vm.isMe ? 'see_who_queue' : 'want_to_queue';
		if(goodData.status === 1) return;

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

	function showPhotoViewer() {
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

	function getGoodsDescription() {
		return marked(vm.goodData.description);
	}

	function onClickBack() {
		if($window.history.length <= 1) {
			$state.go('root.withSidenav.seek');
		} else {
			$window.history.go(-$rootScope.historyCounter);
		}
	}

	function getBackgroundColor() {
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
}


