(function() {
    var seekController = angular.module('seekController', ['seekServices']);

    seekController.controller('seekCtrl', ['$scope', 'seekServ', 
	function($scope, seekServ) {

		// Use seekServices.js to get data from backend
        seekServ.get(function(data) {
            $scope.goods = data;
        });

		// goods onClick event: change route to corrsponding gid
        $scope.action = function(gid) {
            window.location.href = "#/seek/" + gid;
        };
    }]);
})();
