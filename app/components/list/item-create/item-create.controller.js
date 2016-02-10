(function () {
    'use strict';

    angular.module('starter.components.list')
        .controller('ListItemCreateController', ListItemCreateController);

    ListItemCreateController.$inject = [];

    function ListItemCreateController() {
        var vm = this;

        vm.newItem = {};
        vm.onCreate = vm.onCreate();
        vm.onSubmit = onSubmit;

        function onSubmit(item) {
            vm.onCreate({
                title: item.title
            });

            vm.newItem = {};
        }

    }

})();
