(function ()
{
  var seekController = angular.module('seekController', []);

  seekController.controller('SeekCtrl', ['$scope', 'seekServ', function($scope, seekServ) {
      seekServ.get(function(data) {
        $scope.ttttt = data;
      });
  }]);
})();


