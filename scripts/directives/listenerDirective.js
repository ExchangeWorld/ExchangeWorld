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

        scope.resizeWithOffset = function (offsetH)
        {
          scope.$eval(attr.notifier);
          return {
            'min-height': (newValue.h - offsetH) + 'px',
            'height': (newValue.h - offsetH) + 'px',
            'max-height': (newValue.h - offsetH) + 'px'
          };
        };
      }, true);

      w.bind('resize', function ()
      {
        scope.$apply();
      });
    };
  });

})();
