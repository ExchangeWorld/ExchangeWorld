'use strict';

const coreModule        = require('./core.module');
const AvailableCategory = require('../../data/category.json');
const AppSettings       = { appTitle : 'ExchangeWorld', };


coreModule.constant('AppSettings', AppSettings);
coreModule.constant('AvailableCategory', AvailableCategory);
