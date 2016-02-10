(function () {

    angular.module('starter.phones')
        .factory('phonesActions', phonesActions);

    phonesActions.$inject = ['phonesService'];

    function phonesActions(phonesService) {
        return {
            createPhone: createPhone,
            setPhones: setPhones
        };

        function createPhone(phone) {
            return {
                type: 'CREATE_PHONE',
                payload: phone
            };
        }

        function setPhones() {
            return {
                type: 'SET_PHONES',
                payload: {
                    promise: phonesService.getPhones()
                }
            };
        }
    }

})();
