angular.module('mm.ui')
.provider('mmUnsavedWork', function () {

  var defaultMessage;

  // example default message: 'Your unsaved work will be lost! To continue without saving click OK. To go back and save click Cancel.';
  this.setDefaultMessage = function ( message ) {
    defaultMessage = message;
  };

  this.$get = function mmUnsavedWork( $rootScope, $window ) {
    var statuses = {};

    $rootScope.$on('$locationChangeStart', function routeChange( e ) {
      var userDisplayMessage;
      var anyUnsavedWork = false;

      Object.keys(statuses).forEach(function ( key ) {
        if ( statuses[ key ].value ) {
          userDisplayMessage = statuses[ key ].message;
          anyUnsavedWork = true;
        }
      });

      if ( anyUnsavedWork ) {
        var continueToNextLink = $window.confirm(userDisplayMessage);
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
  };

});
