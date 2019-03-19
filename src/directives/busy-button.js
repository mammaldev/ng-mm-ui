angular.module('mm.ui')
.directive('mmBusyButton', function mmBusyButton($parse) {
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
});
