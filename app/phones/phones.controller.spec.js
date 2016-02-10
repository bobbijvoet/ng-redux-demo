describe('given the phonesCtrl', function () {

    var $rootScope, $scope, $controller, $q;
    var ctrl, phonesService, phonesResult;
    beforeEach(module('starter.phones'));

    beforeEach(function () {
        fixture.setBase('test/mocks');
        phonesResult = fixture.load('phones/ok.json');
    });

    afterEach(function () {
        fixture.cleanup()
    });


    beforeEach(inject(function (_$rootScope_, _$controller_, _phonesService_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $q = _$q_;

        phonesService = _phonesService_;
        spyOn(phonesService, 'getPhones');

    }));

    describe('when initializing the controller', function () {
        beforeEach(function () {
            phonesService.getPhones.and.callFake(function () {
                return $q.when(phonesResult)
            });

            ctrl = $controller('PhonesController as phonesController', {$scope: $scope});

        });
        it('set the title', function () {
            expect(ctrl.title).toBe('Phones');

        });
        it('should load the phones', function () {
            $scope.$apply();

            expect(ctrl.phones[0].brand).toBe('Apple');
        });

        describe('and call fails', function () {
            beforeEach(function () {

                phonesService.getPhones.and.callFake(function () {
                    return $q.reject('error');
                });

                ctrl = $controller('PhonesController as phonesController', {$scope: $scope});
            });
            it('should return error', function () {
                $scope.$apply();

                expect(ctrl.error).toBeDefined();
            })

        })
    });


});
