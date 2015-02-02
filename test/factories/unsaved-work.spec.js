describe('mmUnsavedWork factory', function () {

  beforeEach(angular.mock.module('mm.ui'));

  var mockWindow;
  var mockRootScope;
  var confirmResult;
  var confirmCalled;
  var locationChanged;
  var noop = function () {};

  beforeEach(function () {

    mockWindow = {
      confirm: function () {
        confirmCalled = true;
        return confirmResult;
      }
    };

    mockRootScope = {
      $on: function ( name, routeChange ) {
        this.routeChange = routeChange;
      },
      trigger: function () {
        this.routeChange({
          preventDefault: function () {
            locationChanged = false;
          }
        });
      },
      $watch: noop
    };

    confirmCalled = false;
    locationChanged = true;
    confirmResult = false;

    angular.mock.module(function ($provide) {
      $provide.value('$window', mockWindow);
      $provide.value('$rootScope', mockRootScope);
    });

  });

  it('should not call confirm if a false status has been set and the route is changed', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    mmUnsavedWork.setStatus('test', false);
    mockRootScope.trigger();
    expect(confirmCalled).to.equal(false);
  }));

  it('should change change location if no status has been set and the route tries to change', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    mmUnsavedWork.setStatus('test', false);
    mockRootScope.trigger();
    expect(locationChanged).to.equal(true);
  }));

  it('should change change location if a false status has been set and the route tries to change', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    mmUnsavedWork.setStatus('test', false);
    mockRootScope.trigger();
    expect(locationChanged).to.equal(true);
  }));

  it('should call confirm if a true status has been set and the route is changed', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    mmUnsavedWork.setStatus('test', true);
    mockRootScope.trigger();
    expect(confirmCalled).to.equal(true);
  }));

  it('should change location if a true status has been set and the confirm button returns true', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    confirmResult = true;
    mmUnsavedWork.setStatus('test', true);
    mockRootScope.trigger();
    expect(locationChanged).to.equal(true);
  }));

  it('should not change location if a true status has been set and the confirm button returns false', angular.mock.inject(function ( $location, mmUnsavedWork ) {
    confirmResult = false;
    mmUnsavedWork.setStatus('test', true);
    mockRootScope.trigger();
    expect(locationChanged).to.equal(false);
  }));
});

