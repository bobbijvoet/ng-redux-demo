ngDescribe({
    name: 'reducer: phonesReducer',
    module: 'starter.phones',
    inject: ['phonesReducer'],
    tests: function (deps) {
        function stateFactory() {
            return [
                [
                    undefined,
                    [{}],
                    {phones: []}
                ], [
                    {phones: []},
                    [{type: 'CREATE_PHONE', payload: {foo: 'bar'}}],
                    {phones: [{foo: 'bar'}]}
                ], [
                    {phones: []},
                    [
                        {type: 'CREATE_PHONE', payload: {foo: 'bar'}},
                        {type: 'SET_PHONES_FULFILLED', payload: {phones: []}}
                    ],
                    {phones: []}
                ], [
                    {phones: []},
                    [
                        {type: 'SET_PHONES_FULFILLED', payload: {phones: [{foo: 'bar'}]}},
                        {type: 'CREATE_PHONE', payload: {foo2: 'bar2'}}
                    ],
                    {phones: [{foo: 'bar'}, {foo2: 'bar2'}]}
                ]
            ];
        }

        using(stateFactory, function (initialState, actions, expectedState) {
            it('should transition correctly from ' + getActionTypes(actions), function () {
                testStateTransitions(deps.phonesReducer, initialState, actions, expectedState);
            });
        });
    }
});
