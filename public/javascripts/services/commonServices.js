(function ()
{
	var common = angular.module('commonServices', []);

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

})();
