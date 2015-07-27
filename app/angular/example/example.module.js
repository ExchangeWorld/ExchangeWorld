"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('../map/map.module');
module.exports = angular.module('app.example', ['app.core']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);