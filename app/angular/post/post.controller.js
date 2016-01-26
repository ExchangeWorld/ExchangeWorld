'use strict';

const angular = require('angular');
const postModule = require('./post.module');
postModule.controller('PostController', PostController);

/** @ngInject */
function PostController(
	postService,
	JIC,
	$scope,
	$state,
	auth,
	AvailableCategory,
	logger,
	$localStorage,
	$mdDialog
) {
	var vm               = this;
	vm.goodsName         = '';
	vm.goodsDescriptions = '';
	vm.goodPrice 		 = '';
	vm.goodsCategory     = '';
	vm.imgSelect         = [];
	vm.imgEncoded        = [];
	vm.imgCompressed     = [];
	vm.removeMode        = false;
	vm.removeImg         = idx => vm.imgEncoded.splice(idx, 1);
	vm.onSubmit          = onSubmit;
	vm.loading           = false;
	vm.availableCategory = AvailableCategory.slice(1);
	vm.onCategoryChanged = onCategoryChanged;
	$scope.$on('positionMarked', positionMarked);


	////////////////

	function positionMarked(e, latLng) {
		vm.positionX = latLng.lng();
		vm.positionY = latLng.lat();
	}

	$scope.$watch('vm.imgSelect', ()=> {
		if(!vm.imgSelect) return;
		if(!vm.imgEncoded.length) vm.imgEncoded = vm.imgSelect;
		else {
			// vm.imgEncoded.push(vm.imgSelect);
			vm.imgEncoded = vm.imgEncoded.concat(vm.imgSelect);
		}
	});

	function onCategoryChanged(category) {
		// console.log(category);
		if (
			category === 'Christmas' &&
			vm.imgEncoded.length === 0
		) {
			// console.log();
			getBase64FromImageUrl('../../images/Gift.jpg');
		}
	}

	function getBase64FromImageUrl(url) {
		let img = new Image();
		img.setAttribute('crossOrigin', 'anonymous');

		img.onload = function () {
			var canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);

			var dataURL = canvas.toDataURL("image/png");

			vm.imgEncoded.push({base64: dataURL.replace(/^data:image\/(png|jpg);base64,/, "")});
		};

		img.src = url;
	}

	function onSubmit() {
		if(!$localStorage.user) {
			auth
				.login()
				.then(function(user) {
					vm.user = user;
					vm.isLoggedIn = Boolean(user);
					$state.reload();
				});
		} else {
			if(!vm.goodsCategory) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未選擇類別')
						.content('請選擇物品的種類.')
						.ok('知道了!')
				);
			} else if (
				vm.goodsCategory === 'Christmas' &&
				!vm.goodPrice
			) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('聖誕活動')
						.content('聖誕禮物請記得填寫價位喔OvO')
						.ok('知道了!')
				);
			}else if(!(vm.positionX && vm.positionY)) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未指定位置')
						.content('請在地圖側標定物品位置.')
						.ok('知道了!')
					);
			} else if(vm.imgEncoded.length === 0) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未上傳圖片')
						.content('請上傳一張或多張物品的相片.')
						.ok('知道了!')
				);
			} else if( vm.goodsCategory != 'Christmas' && !vm.goodsName) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未輸入物品名稱')
						.content('請輸入物品名稱.')
						.ok('知道了!')
				);
			} else if( vm.goodsCategory != 'Christmas' && !vm.goodsDescriptions) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('未輸入物品敘述')
						.content('請輸入物品敘述.')
						.ok('知道了!')
				);
			} else {
				vm.loading = true;
				/**
				 * 1. compress all img and put imgs to vm.imgCompressed.
				 */
				vm.imgCompressed = vm.imgEncoded.map(function(img, i) {
					if(img.filesize/100 < 100) return img;// if img less than 100 kb , no compression needs.

					var quality    = 50;
					var imgFormat  = 'jpeg';
					var compressed = JIC.compress(document.getElementById('img_'+i), quality, imgFormat);

					return {
						base64   : compressed.src,
						filename : 'img_'+i,
						//filesize : img.filesize * (quality/100),
						filetype : imgFormat,
					};
				});
				/**
				 * 2. upload photos(vm.imgCompressed) and get photo_pathArray,
				 */
				const desc = vm.goodsCategory === 'Christmas'
					? `\<p\>禮物價位：${vm.goodPrice}\</p\>${vm.goodsDescriptions}`
					: vm.goodsDescriptions;

				const name = vm.goodsCategory === 'Christmas'
					? '神秘聖誕禮物'
					: vm.goodsName;

				postService
					.uploadImg(vm.imgCompressed)
					.then(function(data){
						/**
						 * 3. send new post data to backend
						 */
						postService
							.sendNewPostInfo({
								name        : name,
								description : desc,
								category    : vm.goodsCategory,
								position_x  : vm.positionX,
								position_y  : vm.positionY,
								photo_path  : JSON.stringify(data),
								owner_uid   : $localStorage.user.uid,
							})
							.then(function(data) {
								logger.success('已成功發佈一項物品^_^', data, 'POST');
								$state.go('root.withSidenav.goods', { gid: data.gid });
							});
					});
			}
		}
	}
}
