(function () {
    'use strict';

    angular.module('starter.components.list')
        .directive('listItemCreate', listItemCreateDirective);

    listItemCreateDirective.$inject = [];

    function listItemCreateDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/list/item-create/item-create.html',
            scope: {
                onCreate: '&'
            },
            bindToController: true,
            controller: 'ListItemCreateController',
            controllerAs: 'vm'
        };

        return directive;
    }

})();
