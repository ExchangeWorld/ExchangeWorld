'use strict';

const seekModule = require('./seek.module');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController(seekService, $state, AvailableCategory) {
	var vm                 = this;
	vm.goods               = [];
	vm.searchGoodsName     = '';
	vm.searchGoodsCategory = '';
	vm.onClickGoods        = onClickGoods;
	vm.onSearch            = onSearch;
	vm.availableCategory   = AvailableCategory;
//>>>>>>> feature/dev_UI

    //$scope.loading = false;
    //activate();
    //$timeout(function() {
        //$scope.loading = false;
    //}, 1000);
    //$scope.loading = true;
    ///////////////

	/////////
	
	function activate() {
		onSearch();
	}

	function onSearch() {

		seekService
			.getSeek({
				name     : vm.searchGoodsName,
				category : vm.searchGoodsCategory.label,
			})
			.then(function(data) {
				console.log(data);
				vm.goods = data;
			})
			.catch(function() {
				vm.goods = undefined;
			});
	}
	

	//goods onClick event: change route to corrsponding gid
	function onClickGoods(_gid) {
		$state.go('root.withSidenav.goods', { gid: _gid });
	}

//=======
    //function activate() {
        //// Use seek.service.js to get data from backend
        //seekService.getSeekData()
            //.then(function(data) {
                //// promise fulfilled, collect all goods datas
                //vm.goods = data;
            //}).catch(function(error) {
                //// promise rejected 
                //console.log('error', error);
            //});
    //}

    ////goods onClick event: change route to corrsponding gid
    //function onClickGoods(gid) {
        //$state.go('root.goods', {
            //gid: gid
        //});
    //}
//>>>>>>> feature/dev_UI
}
