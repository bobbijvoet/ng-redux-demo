describe('some test that needs a fixture', function () {

    beforeEach(function () {
        fixture.setBase('test/mocks');
        this.result = fixture.load('phones/ok.json');
    });

    afterEach(function () {
        fixture.cleanup()
    });

    it('should give two phones', function () {
        expect(this.result.length).toBe(2);
    });

});
