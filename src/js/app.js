angular.module('joegarb', ['ngRoute', 'angularCSS', 'joegarb.directives', 'joegarb.controllers'],

  // Routing
  function($routeProvider, $locationProvider) {

    $routeProvider.when(
      '/resume',
      {
        templateUrl: 'templates/resume.html',
        controller: 'ResumeController',
        css: 'css/resume.css'
      });

    // Redirect all requests to the resume page
    $routeProvider.otherwise(
      {
        redirectTo: '/resume'
      });

    $locationProvider.html5Mode(true);
  });