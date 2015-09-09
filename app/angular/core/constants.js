'use strict';

const coreModule  = require('./core.module');
const AppSettings = {
	appTitle : 'ExchangeWorld',
};

/**
 * define all avalible categories 
 */
const AvailableCategory = [
		{label : "Books"},
		{label : "Textbooks"},
		{label : "3C"},
		{label : "Clothes"},
		{label : "Others"}
	];
coreModule.constant('AppSettings', AppSettings);
coreModule.constant('AvailableCategory', AvailableCategory);

