'use strict';

var app = require('angular').module('angularjscv.filters', []);

app.filter('trustAsHtml', ['$sce', require('./trustashtml-filter.js')]);
