'use strict';

const seekModule = require('./seek.module');
seekModule.controller('SeekController', SeekController);

/** @ngInject */
function SeekController($scope, seekService, $state, $timeout) {
    var vm = this;
    vm.goods = [];
    vm.onClickGoods = onClickGoods;

    $scope.loading = false;
    activate();
    $timeout(function() {
        $scope.loading = false;
    }, 1500);
    $scope.loading = true;
    /////////////

    function activate() {
        // Use seek.service.js to get data from backend
        seekService.getSeekData()
            .then(function(data) {
                // promise fulfilled, collect all goods datas
                vm.goods = data;
            }).catch(function(error) {
                // promise rejected 
                console.log('error', error);
            });
    }

    //goods onClick event: change route to corrsponding gid
    function onClickGoods(gid) {
        $state.go('root.goods', {
            gid: gid
        });
    }
}
