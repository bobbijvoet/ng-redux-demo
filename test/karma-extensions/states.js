function testStateTransitions(reducer, initialState, actions, expectedState) {
    var state = initialState;

    actions.forEach(function (action) {
        state = reducer(state, action);
    });

    expect(state).toEqual(expectedState);
}
