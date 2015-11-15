'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.colorThief', []);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
