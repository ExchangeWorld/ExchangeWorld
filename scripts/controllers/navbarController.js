(function ()
{
  var navbarController = angular.module('navbarController', []);

  navbarController.controller('DropdownCtrl', function ($scope)
  {
    $scope.status = {
      isopen: false
    };

    $scope.toggleDropdown = function ($event)
    {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  });

  navbarController.controller('NavbarCtrl', function ($scope, $window)
  {
    $scope.test = true;
    $scope.notifyServiceOnChage = function ()
    {
      console.log($scope.windowHeight);
    };

  });

})();
