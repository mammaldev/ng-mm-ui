describe('mmRequireSome directive', function () {

  var compile;
  var scope;
  var elem;
  var form;

  beforeEach(angular.mock.module('mm.ui'));

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    compile = $compile;
    scope = $rootScope;
    elem = angular.element(
      '<form name="form">' +
      '<input ng-model="data.listOfIds" name="someArray" mm-require-some />' +
      '</form>'
    );
    scope.data = { listOfIds: [] };
    $compile(elem)(scope);
    form = scope.form;
    scope.$digest();
  }));

  it('should pass with array from view', function() {
    form.someArray.$setViewValue('3, 2');
    expect(scope.data.listOfIds).to.deep.equal(['3', '2']);
    expect(form.someArray.$valid).to.equal(true);
  });

  it('should pass with array from controller', function() {
    scope.data.listOfIds = ['3', '2'];
    scope.$digest();
    expect(form.someArray.$viewValue).to.deep.equal(['3', '2']);
    expect(form.someArray.$valid).to.equal(true);
  });

  it('should not pass with an empty string', function() {
    form.someArray.$setViewValue('');
    expect(scope.data.listOfIds).to.equal(undefined);
    expect(form.someArray.$valid).to.equal(false);
  });

  it('should not pass with undefined', function() {
    expect(scope.data.listOfIds).to.equal(undefined);
    expect(form.someArray.$valid).to.equal(false);
  });

});
