"use strict";

const coreModule = require('./core.module');
coreModule.config(materialTheme);

function materialTheme($mdThemingProvider) {
	$mdThemingProvider
		.theme('default')
		.primaryPalette('grey', {
			'default': '600', // by default use shade 600 from the teal palette for primary intentions
			'hue-1': '100', // use shade 400 for the <code>md-hue-1</code> class
			'hue-2': '900', // use shade 900 for the <code>md-hue-2</code> class
			'hue-3': '200' // use shade A100 for the <code>md-hue-3</code> class
		})
		// If you specify less than all of the keys, it will inherit from the
		// default shades
		.accentPalette('indigo', {
			'default': '100',
			'hue-1': '500',
			'hue-2': '900',
			'hue-3': '100'
		});
}
