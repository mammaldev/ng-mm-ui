angular.module('mm.ui')
.factory('mmUnsavedWork', function ( $rootScope, $window ) {
  var statuses = {};

  $rootScope.$on('$locationChangeStart', function routeChange( e ) {
    var anyUnsavedWork = Object.keys(statuses).some(function ( key ) {
      return statuses[ key ];
    });
    if ( anyUnsavedWork ) {
      var continueToNextLink = $window.confirm('Your unsaved work will be lost! To continue without saving click OK. To go back and save click Cancel.');
      if ( continueToNextLink ) {
        statuses = {};
      } else {
        e.preventDefault();
      }
    }
  });

  return {
    setStatus: function ( key, value ) {
      statuses[ key ] = value;
    }
  };
});
