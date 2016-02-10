(function () {
    'use strict';

    angular
        .module('starter.phones')
        .factory('phonesService', phonesService);

    phonesService.$inject = ['$http', '$q'];

    function phonesService($http, $q) {
        return {
            getPhones: getPhones
        };

        function getPhones() {
            return $http.get('/phones', {}).then(getPhonesSuccess, getPhonesFail);

            function getPhonesSuccess(response) {
                return response.data;
            }

            function getPhonesFail(error) {
                return $q.reject(error);
            }
        }
    }

})();
