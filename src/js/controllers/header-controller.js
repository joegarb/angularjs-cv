'use strict';

module.exports = function($scope, $window, $location) {
  $scope.isActiveUrl = function(templateUrl) {
    return templateUrl === $location.path();
  };
};