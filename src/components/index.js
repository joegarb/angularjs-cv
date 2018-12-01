'use strict';

var app = require('angular').module('angularjscv.components', ['ngRoute']);

app.component('header', require('./header/header.js'));
app.component('cv', require('./cv/cv.js'));
