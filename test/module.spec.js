describe('mmUi module', function () {

  beforeEach(angular.mock.module('mm.ui'));

  it('should be available', function () {
    return expect(angular.module('mm.ui')).to.exist;
  });
});
