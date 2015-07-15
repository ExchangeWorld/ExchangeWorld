(function() {
    var goodsController = angular.module('goodsController', ['goodsServices']);

    goodsController.controller('goodsCtrl', ['$scope', 'goodsServ', '$routeParams',
    function($scope, goodsServ, $routeParams) {
        goodsServ.get(function(data) {
            //$scope= data;
            $scope.goodsProps = data;
        }, $routeParams.gid);

        $scope.test = 5;

    }]);
})();
