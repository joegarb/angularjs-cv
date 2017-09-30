'use strict';

describe('CvController', function() {
    var CvController;
    var $scope;

    beforeEach(module('joegarb'));

    beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        CvController = _$controller_('CvController', {$scope: $scope});
    }));

    describe('getDateString', function() {
        it('returns Present for an empty date', function() {
            chai.expect(CvController.getDateString()).to.equal('Present');
        });
    });
});
