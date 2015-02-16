angular.module('mm.ui')
.directive('mmRequireSome', function mmRequireSome() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function ( scope, elem, attr, ngModel ) {

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function ( newValue ) {
        ngModel.$setViewValue(newValue);
        ngModel.$render();
      }, true);

      ngModel.$validators.mmRequireSome = function ( modelValue, viewValue ) {
        var value = modelValue || viewValue;

        if ( modelValue && modelValue.length ) {
          return true;
        }

        return false;
      };

      ngModel.$parsers.unshift(function (value) {
        if (!Array.isArray(value)) {
          if ( value && value.length > 0) {
            value = value.split(/[ ,]+/);
          } else {
            value = [];
          }
        }
        ngModel.$setValidity('mmRequireSome', value && value.length > 0);
        return value;
      });
    }
  };
});
