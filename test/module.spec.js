describe('mmUi module', function () {

  beforeEach(angular.mock.module('mm.ui'));

  it('should be available', function () {
    expect(angular.module('mm.ui')).toBeTruthy();
  });
});
