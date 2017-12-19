'use strict';
(function () {
  var synchronizeFields = window.synchronizeFields;
  var ROOMS_ELEMENT = document.querySelector('[name=rooms]');
  var GUESTS_ELEMENT = document.querySelector('[name=capacity]');
  var ROOMS_ORDER = ['1', '2', '3', '100'];
  var GUESTS_ORDER = ['1', '2', '3', '0'];

  var CHECK_IN_ELEMENT = document.querySelector('[name=timein]');
  var CHECK_OUT_ELEMENT = document.querySelector('[name=timeout]');

  var TYPE_ELEMENT = document.querySelector('[name=type]');
  var TYPE_ORDER = window.data.HOUSE_TYPE;
  var PRICE_ELEMENT = document.querySelector('[name=price]');
  var MIN_PRICE_ORDER = ['1000', '5000', '0', '10000'];


  function setMin(element, value) {
    element.min = value;
  }

  synchronizeFields(ROOMS_ELEMENT, ROOMS_ORDER, GUESTS_ELEMENT, GUESTS_ORDER);
  synchronizeFields(CHECK_IN_ELEMENT, window.data.CHECK_IN, CHECK_OUT_ELEMENT, window.data.CHECK_OUT);
  synchronizeFields(CHECK_OUT_ELEMENT, window.data.CHECK_OUT, CHECK_IN_ELEMENT, window.data.CHECK_IN);
  synchronizeFields(TYPE_ELEMENT, TYPE_ORDER, PRICE_ELEMENT, MIN_PRICE_ORDER, setMin);

  window.pin.createUserPin(function (x, y) {
    document.querySelector('[name=address]').value = 'x: ' + x + ', y: ' + y;
  });
}());
