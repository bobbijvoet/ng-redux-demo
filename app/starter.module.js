(function () {
    'use strict';

    angular.module('starter', [
        'starter.phones',
        'starter.components',

        'ngRedux'
    ]).config(function($ngReduxProvider, rootReducerProvider) {
        $ngReduxProvider.createStoreWith(rootReducerProvider.$get(), ['promiseMiddleware', 'loggerMiddleware']);
    });

})();
