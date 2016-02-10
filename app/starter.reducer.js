(function () {
    'use strict';

    angular.module('starter')
        .factory('rootReducer', rootReducer);

    rootReducer.$inject = ['phonesReducer'];

    function rootReducer(phonesReducer) {
        return Redux.combineReducers({
            phones: phonesReducer
        });
    }

})();
