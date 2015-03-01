(function ()
{
  var common = angular.module('commonSevices', []);

  common.service('sharedProperties', function ()
  {
    var stringValue = 'seek';

    return {
      getString: function ()
      {
        return stringValue;
      },
      setString: function (value)
      {
        stringValue = value;
      }
    };
  });

  common.service('windowProperty', function () {

		return
  });
})();
