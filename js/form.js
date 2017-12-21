'use strict';
(function () {
  var synchronizeFields = window.synchronizeFields;
  var roomsElement = document.querySelector('[name=rooms]');
  var guestsElement = document.querySelector('[name=capacity]');
  var ROOMS_ORDER = ['1', '2', '3', '100'];
  var GUESTS_ORDER = ['1', '2', '3', '0'];

  var checkInElement = document.querySelector('[name=timein]');
  var checkOutElement = document.querySelector('[name=timeout]');

  var typeElement = document.querySelector('[name=type]');
  var TYPE_ORDER = window.data.HOUSE_TYPE;
  var priceElement = document.querySelector('[name=price]');
  var MIN_PRICE_ORDER = ['1000', '5000', '0', '10000'];

  var userForm = document.querySelector('.notice__form');

  function setMin(element, value) {
    element.min = value;
  }

  synchronizeFields(roomsElement, ROOMS_ORDER, guestsElement, GUESTS_ORDER);
  synchronizeFields(checkInElement, window.data.CHECK_IN, checkOutElement, window.data.CHECK_OUT);
  synchronizeFields(checkOutElement, window.data.CHECK_OUT, checkInElement, window.data.CHECK_IN);
  synchronizeFields(typeElement, TYPE_ORDER, priceElement, MIN_PRICE_ORDER, setMin);

  window.pin.createUserPin(function (x, y) {
    document.querySelector('[name=address]').value = 'x: ' + x + ', y: ' + y;
  });

  var onLoad = function () {
    window.notification.success('Ваше объявление успешно добавлено!');
    userForm.reset();
  };

  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), onLoad, window.notification.error);
    evt.preventDefault();
  });
}());
