describe('mmBusyButton directive', function () {

  var compile;
  var scope;
  var elem;

  beforeEach(angular.mock.module('mm.ui'));
  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    compile = $compile;
    scope = $rootScope;
    elem = angular.element(
      '<button mm-busy-button mm-busy-button-model="busy">Save</button>'
    );
    $compile(elem)(scope);
    scope.$digest();
  }));

  it('should add a default class to the element (for styling)', function () {
    expect(elem.hasClass('busy-button'));
  });

  it('should add a class when the model evaluates to true', function () {
    scope.$apply(function () {
      scope.busy = true;
    });
    expect(elem.hasClass('busy-button-busy')).to.equal(true);
  });

  it('should disable the button when the model evaluates to true', function () {
    scope.$apply(function () {
      scope.busy = true;
    });
    expect(elem.prop('disabled')).to.equal(true);
  });

  it('should remove a class when the model evaluates to false', function () {
    scope.$apply(function () {
      scope.busy = false;
    });
    expect(elem.hasClass('busy-button-busy')).to.equal(false);
  });

  it('should enable the button when the model evaluates to true', function () {
    scope.$apply(function () {
      scope.busy = false;
    });
    expect(elem.prop('disabled')).to.equal(false);
  });

  it('should change the button text when the model evaluates to true' +
    ' and the appropriate scope property is set', function () {
    scope.message = 'Saving';
    elem = angular.element(
      '<button mm-busy-button mm-busy-button-model="busy" mm-busy-button-message="{{ message }}">Save</button>'
    );
    compile(elem)(scope);
    expect(elem.text()).to.equal('Save');
    scope.$apply(function () {
      scope.busy = true;
    });
    expect(elem.text()).to.equal('Saving');
  });

  it('should change the button text back to the default when the model evaluates to false' +
    ' and the appropriate scope property is set', function () {
    scope.busy = true;
    scope.message = 'Saving';
    elem = angular.element(
      '<button mm-busy-button mm-busy-button-model="busy" mm-busy-button-message="{{ message }}">Save</button>'
    );
    compile(elem)(scope);
    scope.$digest();
    expect(elem.text()).to.equal('Saving');
    scope.$apply(function () {
      scope.busy = false;
    });
    expect(elem.text()).to.equal('Save');
  });
});
