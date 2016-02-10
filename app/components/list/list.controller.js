(function () {
    'use strict';

    angular.module('starter.components.list')
        .controller('ListController', ListController);

    ListController.$inject = [];

    function ListController() {
        var vm = this;

        vm.onCreate = vm.onCreate();

    }

})();
