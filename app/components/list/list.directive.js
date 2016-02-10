(function () {
    'use strict';

    angular.module('starter.components.list')
        .directive('list', listDirective);

    listDirective.$inject = [];

    function listDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/list/list.html',
            scope: {
                items: '=',
                onCreate: '&'
            },
            bindToController: true,
            controller: 'ListController',
            controllerAs: 'vm'
        };

        return directive;
    }

})();
