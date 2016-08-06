angular.module('joegarb.controllers', ['ngRoute', 'ngResource'])

  .controller('HeaderController', function($scope, $window, $location) {
    $scope.isActiveUrl = function(templateUrl) {
      return templateUrl === $location.path();
    };
  })

  .controller('ResumeController', function($scope, $routeParams) {
    // Enable the pills (tabs) functionality
    $('.nav-pills a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  })

  .run(function($rootScope) {
    // A place for global constants, etc
  });