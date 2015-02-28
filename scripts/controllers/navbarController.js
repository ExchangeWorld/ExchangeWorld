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
    var ContentType = ["seek", "post", "profile", "good"];
    $scope.content = "";
    $scope.contentHistory = {};

    $scope.setContent = function (contentIndex)
    {
      $scope.content = ContentType[contentIndex];
      $scope.contentHistory.push($scope.content);
    };

    $scope.contentIs = function (contentIndex)
    {
      return $scope.content === ContentType[contentIndex];
    };
  });

})();
