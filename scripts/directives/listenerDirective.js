(function ()
{
  var listenerDirective = angular.module('listenerDirective', []);

  listenerDirective.directive('resize', function ($window)
  {
    return function (scope, element, attr)
    {

      var w = angular.element($window);
      scope.$watch(function ()
      {
        return {
          'h': window.innerHeight,
          'w': window.innerWidth
        };
      }, function (newValue, oldValue)
      {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;
        scope.$eval(attr.notifier);
      }, true);

      w.bind('resize', function ()
      {
        scope.$apply();
      });
    };
  });

})();
