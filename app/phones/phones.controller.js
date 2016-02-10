(function () {
    'use strict';

    angular
        .module('starter.phones')
        .controller('PhonesController', PhonesController);

    PhonesController.$inject = ['$scope', '$ngRedux', 'phonesActions'];

    function PhonesController($scope, $ngRedux, phonesActions) {
        var vm = this;
        var unsubscribe = $ngRedux.connect(mapStateToVm, phonesActions)(vm);

        vm.title = 'Phones';

        $scope.$on('$destroy', unsubscribe);

        vm.setPhones();

        //TODO: Create add phone function

        function mapStateToVm(state) {
            return {
                phones: state.phones
            };
        }
    }
})();
