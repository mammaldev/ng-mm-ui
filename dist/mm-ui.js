angular.module('mm.ui', []);

angular.module('mm.ui')
.directive('mmBusyButton', function mmBusyButton() {

  return {

    //
    // Scope:
    //   busy       {Boolean}    Whether or not the button is in the busy state
    //   message    {String}     The text to show on the button when busy
    //
    scope: {
      busy: '=mmBusyButtonModel',
      message: '@mmBusyButtonMessage'
    },

    link: function (scope, elem) {

      // The default message is the text within the DOM node at compile-time
      var defaultMessage = elem.text();

      // This class is used for the basic styling
      elem.addClass('busy-button');

      // Watch the 'busy' model and toggle the disabled state of the button and
      // the class that shows the spinner when it changes
      scope.$watch('busy', function (nv) {

        if (nv !== undefined) {

          // Add/remove the 'busy' class and disable/enable the button
          elem
          .toggleClass('busy-button-busy', nv)
          .prop('disabled', nv);

          if (nv && scope.message) {

            // If we are currently busy then we change the message
            elem.text(scope.message);

          } else if (!nv && scope.message) {

            // If we're not busy then we reset the text to the default message
            elem.text(defaultMessage);
          }
        }
      });
    }
  };
});

angular.module('mm.ui')
.directive('mmRequireSome', function mmRequireSome() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function ( scope, elem, attr, ngModel ) {

      console.log('mm-r-s');

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function ( newValue ) {

      console.log('mm-r-s', newValue);
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
