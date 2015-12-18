'use strict';

const coreModule  = require('./core.module');
const AppSettings = { appTitle : 'ExchangeWorld', };

/**
 * define all avalible categories
 */
const AvailableCategory = [
	{
		label: "all",
		alias: "全部"
	},
	{
		label: "Christmas",
		alias: "聖誕禮物"
	},
	{
		label: "Books",
		alias: "書"
	},
	{
		label: "Textbooks",
		alias: "教科書"
	},
	{
		label: "3C",
		alias: "電子產品"
	}, 
	{
		label: "Clothes",
		alias: "服飾"
	},
	{
		label: "Others",
		alias: "其他"
	}
];
coreModule.constant('AppSettings', AppSettings);
coreModule.constant('AvailableCategory', AvailableCategory);
