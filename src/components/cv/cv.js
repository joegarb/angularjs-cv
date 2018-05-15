'use strict';

module.exports = {
    templateUrl: 'components/cv/cv.html',
    controller: function() {
        var ctrl = this;
        var moment = require('moment');

        // data.json should be located at the project root
        ctrl.data = require('../../../data.json').cv;

        ctrl.getDateString = function(date) {
            if (!date) {
                return 'Present';
            }
            return moment(date).format('MMM YYYY');
        };

        ctrl.getDuration = function(startDate, endDate) {
            var end;
            if (endDate) {
                end = moment(endDate);
            } else {
                end = moment();
            }

            var duration = moment.duration(end.diff(startDate));
            var years = duration.years();
            var months = duration.months();
            if (duration.days() >= 13) {
                // Round up to the end of the month since we don't display days
                months++;
            }
            if (months >= 12) {
                years++;
                months -= 12;
            }

            var result = '';
            if (years === 1) {
                result = years + ' year';
            } else if (years > 1) {
                result = years + ' years';
            }
            if (months) {
                if (result) {
                    result += ' ';
                }
                if (months === 1) {
                    result += months + ' month';
                } else {
                    result += months + ' months';
                }
            }
            return result;
        };
    }
};
