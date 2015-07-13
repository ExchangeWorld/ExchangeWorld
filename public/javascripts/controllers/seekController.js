(function() {
    var seekController = angular.module('seekController', ['seekServices']);

    seekController.controller('seekCtrl', ['$scope', 'seekServ', function($scope, seekServ) {
        seekServ.get(function(data) {
            $scope.goods = data;
        });

        $scope.test = 5;
        $scope.action = function(gid) {
            //alert("test  " + gid);
            //$location.path("#/seek/12");
            window.location.href = "#/seek/" + gid;
        };
    }]);
})();
