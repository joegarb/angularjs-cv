'use strict';

require('angular').module(
    'angularjscv',
    ['ngRoute', 'angularjscv.components', 'angularjscv.directives', 'angularjscv.filters'],
    ['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider.when('/cv', {
                template: '<cv></cv>'
            });

            // In case anyone has the outdated resume link, redirect it to cv
            $routeProvider.when('/resume', {
                redirectTo: '/cv'
            });

            // Redirect all requests to the cv page until we have a proper home page
            $routeProvider.otherwise({
                redirectTo: '/cv'
            });

            $locationProvider.html5Mode(true);
        }]
);

require('angular-route');

require('./components');
require('./shared');
