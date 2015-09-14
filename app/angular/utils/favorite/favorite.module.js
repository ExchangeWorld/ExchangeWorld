'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.favorite', []);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
