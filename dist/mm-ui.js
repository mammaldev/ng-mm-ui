angular.module('mm.ui', []);

angular.module('mm.ui')
.directive('mmBusyButton', ["$parse", function mmBusyButton($parse) {
  return {
    // Attrs:
    //   mmBusyButtonModel      {Boolean}   Whether or not the button is in the busy state
    //   mmBusyButtonMessage    {String}    (Optional) Button text when busy
    //   mmBusyButtonDefault    {String}    (Optional) Button text when not busy. When not set the initial button text is used.

    link: function (scope, elem, attrs) {
      elem.addClass('busy-button');

      var initialText = elem.text();
      var getIsBusy = $parse(attrs.mmBusyButtonModel).bind(null, scope);

      scope.$watch(getIsBusy, function (isBusy, wasBusy) {
        if (isBusy === wasBusy) return;

        if (isBusy !== wasBusy) {
          // Add/remove the 'busy' class and disable/enable the button
          elem
          .toggleClass('busy-button-busy', isBusy)
          .prop('disabled', isBusy);

          var buttonText = isBusy ? attrs.mmBusyButtonMessage : (attrs.mmBusyButtonDefault || initialText);
          if (buttonText) elem.text(buttonText);
        }
      });
    }
  };
}]);

angular.module('mm.ui')
.directive('mmRequireSome', function mmRequireSome() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function ( scope, elem, attr, ngModel ) {

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function ( newValue ) {
        ngModel.$setViewValue(angular.copy(newValue));
        ngModel.$render();
      }, true);

      ngModel.$validators.mmRequireSome = function ( modelValue ) {

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

angular.module('mm.ui')
.provider('mmUnsavedWork', function () {

  var defaultMessage;

  // example default message: 'Your unsaved work will be lost! To continue without saving click OK. To go back and save click Cancel.';
  this.setDefaultMessage = function ( message ) {
    defaultMessage = message;
  };

  this.$get = ["$rootScope", "$window", function mmUnsavedWork( $rootScope, $window ) {
    var statuses = {};

    $rootScope.$on('$locationChangeStart', function routeChange( e ) {
      var userDisplayMessages = [];
      var anyUnsavedWork = false;

      Object.keys(statuses).forEach(function ( key ) {
        if ( statuses[ key ].value ) {
          userDisplayMessages.push(statuses[ key ].message);
          anyUnsavedWork = true;
        }
      });

      if ( anyUnsavedWork ) {
        var continueToNextLink;
        for ( var i = 0; i < userDisplayMessages.length; i++ ) {
          continueToNextLink = $window.confirm(userDisplayMessages[ i ]);
          if ( !continueToNextLink ) {
            break;
          }
        }

        if ( continueToNextLink ) {
          statuses = {};
        } else {
          e.preventDefault();
        }
      }
    });

    return {
      setStatus: function ( key, value, optionalDefaultMessage ) {
        var statusMessage = optionalDefaultMessage || defaultMessage;
        if ( value && !statusMessage ) {
          throw new Error('You must provide an alert message');
        }

        statuses[ key ] = {
          value: value,
          message: statusMessage
        };
      }
    };
  }];

});
