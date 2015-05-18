(function ()
{
  var navbarController = angular.module('navbarController', ['ngRoute']);

  navbarController.directive('navbar', function () {
      return {
          restrict: 'E',
          templateUrl: "views/navbar.html"
      };
  });

  navbarController.controller('DropdownCtrl', ['$scope',function ($scope)
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
  }]);

  navbarController.controller('NavbarCtrl', [
    '$scope','$mdSidenav','$route',
    function ($scope, $mdSidenav, $route)
  {
    var ContentType = ["home", "seek", "post", "manage", "profile", "good"];
    $scope.$on('$routeChangeSuccess', function()
    {
        var url = $route.current.templateUrl;
        //console.log(url);
        if(url !== undefined)
            $scope.content = url.split('/')[1].split('.')[0];
    });
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

    $scope.onClick = function (contentIndex)
    {
      $scope.content = ContentType[contentIndex];
      $scope.$emit('sidenavChanged',ContentType[contentIndex]);
      $mdSidenav('left').toggle();
    }

  }]);

})();
