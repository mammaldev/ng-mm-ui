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

      ngModel.$formatters.unshift(function (value) {
        ngModel.$setValidity('mmRequireSome', value && value.length > 0);
        return value;
      });

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
