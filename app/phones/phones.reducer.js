(function () {

    angular.module('starter.phones')
        .provider('phonesReducer', phonesReducer);

    phonesReducer.$inject = [];

    function phonesReducer() {

        var initialState = {
            phones: []
        };

        this.$get = function () {
            return reducer;
        };

        function reducer(state, action) {
            if (angular.isUndefined(state)) {
                return angular.copy(initialState);
            }

            switch (action.type) {
                case 'CREATE_PHONE':
                    state.phones.push(action.payload);

                    break;
                case 'SET_PHONES_FULFILLED' :
                    state = angular.copy(action.payload);

                    break;
            }


            return state;
        }
    }

})();
