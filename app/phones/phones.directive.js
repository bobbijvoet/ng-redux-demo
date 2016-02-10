(function () {

    angular
        .module('starter.phones')
        .directive('phones', phonesDirective);

    function phonesDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'phones/phones.html',
            scope: {},
            bindToController: true,
            controller: 'PhonesController',
            controllerAs: 'vm'
        };

        return directive;

    }
})();
