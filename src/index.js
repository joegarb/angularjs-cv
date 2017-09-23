'use strict';

var app = require('angular').module(
    'joegarb',
    [
        'ngRoute', 'angularCSS', 'duScroll',
        'joegarb.controllers', 'joegarb.directives', 'joegarb.filters'
    ],
    ['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider.when(
                '/cv',
                {
                    templateUrl: 'components/cv/cv.html',
                    controller: 'CvController',
                    css: 'components/cv/cv.css'
                }
            );

            // In case anyone has the outdated resume link, redirect it to cv
            $routeProvider.when(
                '/resume',
                {
                    redirectTo: '/cv'
                }
            );

            // Redirect all requests to the cv page until we have a proper home page
            $routeProvider.otherwise(
                {
                    redirectTo: '/cv'
                }
            );

            $locationProvider.html5Mode(true);
        }]
);

// When scrolling to a particular element on the page via a link like <a href="#experience" du-smooth-scroll>,
// leave space at the top for the fixed nav bar. It'd be nice to not have the height hard-coded here though...
app.value('duScrollOffset', 53.78125);

require('angular-route');
require('angular-css');
require('angular-scroll');

require('./components');
require('./shared');
