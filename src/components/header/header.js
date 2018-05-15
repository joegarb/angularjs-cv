'use strict';

module.exports = {
    templateUrl: 'components/header/header.html',
    controller: ['$scope', '$location', function($scope, $location) {
        $scope.isActiveUrl = function(templateUrl) {
            return templateUrl === $location.path();
        };
    }]
};
