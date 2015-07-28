(function() {
    var goodsController = angular.module('goodsController', ['goodsServices']);

    goodsController.controller('goodsCtrl', ['$scope', 'goodsServ', '$routeParams',
    function($scope, goodsServ, $routeParams) {

		// get data from goodsServices.js
        goodsServ.get(function(data) {
            $scope.goodsProps = data;
        }, $routeParams.gid);

		// define onClick event on goods owner
        $scope.action = function(fb_id){
            window.location.href = "#/profile/" + fb_id;
		};

    }]);
})();
