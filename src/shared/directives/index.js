'use strict';

var app = require('angular').module('joegarb.directives', []);

app.directive('jgHref', ['$location', '$route', require('./href-directive.js')]);
