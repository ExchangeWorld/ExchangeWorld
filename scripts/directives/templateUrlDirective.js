(function ()
{
  var templateUrlDircetive = angular.module('templateUrlDircetive', []);

  templateUrlDircetive.directive('navbar', function ()
  {
    return {
      restrict: 'E',
      templateUrl: "views/navbar.html"
    };
  });

  templateUrlDircetive.directive('sidenav', function ()
  {
    return {
      restrict: 'E',
      template: '<div flex="25" ng-include="template()"></div>',
      controller: function ($scope, sharedProperties)
      {
        $scope.template = function ()
        {
          return "views/" + sharedProperties.getString() + ".html";
        };
      }
    };
  });
})();
