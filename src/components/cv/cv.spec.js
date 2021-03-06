'use strict';

var moment = require('moment');

describe('cv', function() {
    var ctrl;

    beforeEach(angular.mock.module('angularjscv'));

    beforeEach(angular.mock.inject(function(_$componentController_) {
        ctrl = _$componentController_('cv', null, {});
    }));

    describe('getDateString', function() {
        it('returns Present for an empty date', function() {
            chai.expect(ctrl.getDateString()).to.equal('Present');
        });

        it('returns Feb 2017 for 2017-02-01', function() {
            chai.expect(ctrl.getDateString('2017-02-01')).to.equal('Feb 2017');
        });
    });

    describe('getDuration', function() {
        it('returns the duration for start date 1 month ago and end date empty', function() {
            var actual = ctrl.getDuration(moment().subtract(1, 'months').format('YYYY-MM-DD'));
            chai.expect(actual).to.equal('1 month');
        });

        it('returns the duration for start date 2 months ago and end date empty', function() {
            var actual = ctrl.getDuration(moment().subtract(2, 'months').format('YYYY-MM-DD'));
            chai.expect(actual).to.equal('2 months');
        });

        it('returns the duration for start date 1 year ago and end date empty', function() {
            var actual = ctrl.getDuration(moment().subtract(1, 'years').format('YYYY-MM-DD'));
            chai.expect(actual).to.equal('1 year');
        });

        it('returns the duration for start date 2 years and 3 months ago and end date empty', function() {
            var actual = ctrl.getDuration(moment().subtract(2, 'years').subtract(3, 'months')
                .format('YYYY-MM-DD'));
            chai.expect(actual).to.equal('2 years 3 months');
        });

        it('returns the duration for known start and end dates - full months', function() {
            chai.expect(ctrl.getDuration('2013-08-01', '2017-01-31')).to.equal('3 years 6 months');
        });

        it('returns the duration for known start and end dates - partial month', function() {
            chai.expect(ctrl.getDuration('2013-08-01', '2017-02-15')).to.equal('3 years 7 months');
        });

        it('returns the duration for known start and end dates - partial month at end of year', function() {
            chai.expect(ctrl.getDuration('2013-08-01', '2017-07-15')).to.equal('4 years');
        });

        it('returns the duration for known start and end dates - end of year plus 1 partial month', function() {
            chai.expect(ctrl.getDuration('2013-08-01', '2017-08-15')).to.equal('4 years 1 month');
        });
    });
});
