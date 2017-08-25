'use strict';

var app = require('angular').module('joegarb.filters', []);

app.filter(
    'trustAsHtml',
    ['$sce', require('./trustashtml-filter.js')]
);
