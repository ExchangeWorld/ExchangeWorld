(function ()
{
  var seekController = angular.module('seekController', ['seekServices']);

  seekController.controller('seekCtrl', ['$scope', 'seekServ', function($scope, seekServ) {
      seekServ.get(function(data) {
        $scope.ttttt = data;
      });
  }]);
})();
