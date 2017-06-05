'use strict';

module.exports = function($scope, $routeParams) {
  var moment = require('moment');

  $scope.data = require('./cv.json');

  $scope.getDateString = function(date) {
    if (!date) {
      return 'Present';
    }
    return moment(date).format('MMM YYYY');
  };

  $scope.getDuration = function(startDate, endDate) {
    var end;
    if (endDate) {
      end = moment(endDate);
    } else {
      end = moment();
    }
    var duration = moment.duration(end.diff(startDate));
    var years = duration.years();
    var months = duration.months() + 1;
    var result = '';
    if (years) {
      result = years + ' years';
    }
    if (months) {
      if (result) {
        result += ' ';
      }
      result += months + ' months';
    }
    return result;
  };
};
