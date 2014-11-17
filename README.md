# ng-mm-ui

An AngularJS module to provide a variety of useful UI components. These
components are intended to be generic enough to be useful across a range of
projects and usually require styling by those projects.

## Installation

The module is available through Bower. You can install it by running `bower
install ng-mm-ui`. Once you've got the code you'll need to add the module as a
dependency to your app:

```js
angular.module('YourApp', [
  'mm.ui'
]);
```

## Usage

### The `mmBusyButton` directive

The `mmBusyButton` directive provides a mechanism for toggling class names and,
optionally, the text of buttons when the value of some model changes. This
directive will add the `busy-button` class to its element.

##### Usage

```html
<button mm-busy-button mm-busy-button-model="busy">Do stuff</button>
```

##### Arguments

| Name                  | Type       | Details |
| --------------------- | ---------- | ------- |
| `mmBusyButtonModel`   | Expression | If the expression is truthy then the `busy-button-busy` class is added to the element. If the expression is falsy the class is removed from the element. |
| `mmBusyButtonMessage`<br>*(optional)* | String | If the `mmBusyButtonModel` expression is truthy the button text will be changed to this value. If the expression is falsy the text will be changed back to the string present in the source. |

### The `mmRequireSome` directive

The `mmRequireSome` directive provides validation for the length of items in an array. It's primary use case is providing validation for a hidden form control where more complex ui modifies the controller $scope value.

##### Usage

```html
<form name="myForm" ng-submit="doSomething()">
  <input type="text" name="listOfIds" ng-model="data.listOfIds" mm-require-some />
  <span class="invalid" ng-show="myForm.listOfIds.$error.mmRequireSome">
    The array is empty
  </span>
  <button type="submit" ng-disabled="myForm.$invalid">Submit</button>
</form>
```

