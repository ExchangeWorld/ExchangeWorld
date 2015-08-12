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
		{label : "Magazine"},
		{label : "Movies"},
		{label : "Music CD"},
		{label : "Video Game"},
		{label : "Smart Phone"},
		{label : "Tablet"},
		{label : "Camera"},
		{label : "Audio"},
		{label : "Computer Hardware"},
		{label : "Jewelry"},
		{label : "Clothing"},
		{label : "Shoes"},
		{label : "Watches"},
		{label : "Furniture"},
		{label : "Others"}
	];
coreModule.constant('AppSettings', AppSettings);
coreModule.constant('AvailableCategory', AvailableCategory);

