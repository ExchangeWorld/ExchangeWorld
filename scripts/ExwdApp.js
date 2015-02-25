(function ()
{
	var ExwdApp = angular.module('ExwdApp', ['ngMaterial', 'ui.bootstrap', 'navbarController', 'listenerDirective', 'templateUrlDircetive']);

	ExwdApp.config(function ($mdThemingProvider)
	{
		$mdThemingProvider.theme('default')
			.primaryPalette('teal',
			{
				'default': '600', // by default use shade 600 from the teal palette for primary intentions
				'hue-1': '400', // use shade 400 for the <code>md-hue-1</code> class
				'hue-2': '900', // use shade 900 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			// If you specify less than all of the keys, it will inherit from the
			// default shades
			.accentPalette('amber',
			{
				'default': '700'
			});
	});

})();
