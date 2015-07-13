(function() {
    var goodsController = angular.module('goodsController', ['goodsServices']);

    goodsController.controller('goodsCtrl', ['$scope', 'goodsServ', function($scope, goodsServ) {
        goodsServ.get(function(data) {
            //$scope= data;
            $scope.goodsProps = data;
        });

        $scope.test = 5;

    }]);
})();
