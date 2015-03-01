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

  navbarController.controller('NavbarCtrl', function ($scope, $mdSidenav, sharedProperties)
  {
    var ContentType = ["seek", "post", "profile", "good"];
    $scope.content = "seek";
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

    $scope.clickSeek = function ()
    {
      sharedProperties.setString(ContentType[0]);

      $scope.content = ContentType[0];
      $mdSidenav('left').toggle();
    };

    $scope.clickPost = function ()
    {
      sharedProperties.setString(ContentType[1]);

      $scope.content = ContentType[1];
      $mdSidenav('left').toggle();
    };

    $scope.clickProfile = function ()
    {
      sharedProperties.setString(ContentType[2]);
      if($scope.content === ContentType[2])
        return;
      $scope.content = ContentType[2];

    };

    $scope.clickGood = function ()
    {
      sharedProperties.setString(ContentType[3]);
      if($scope.content === ContentType[3])
        return;
      $scope.content = ContentType[3];

    };

  });

})();
