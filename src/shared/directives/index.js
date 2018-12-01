'use strict';

var app = require('angular').module('angularjscv.directives', []);

app.directive('jgHref', ['$location', '$route', require('./href-directive.js')]);
