'use strict';
(function () {
  var synchronizeFields = window.synchronizeFields;
  var roomsElement = document.querySelector('[name=rooms]');
  var guestsElement = document.querySelector('[name=capacity]');
  var ROOMS_VALUES = ['1', '2', '3', '100'];
  var GUESTS_VALUES = ['1', '2', '3', '0'];

  var checkInElement = document.querySelector('[name=timein]');
  var checkOutElement = document.querySelector('[name=timeout]');

  var typeElement = document.querySelector('[name=type]');
  var TYPES_VALUES = window.data.HOUSE_TYPE;
  var priceElement = document.querySelector('[name=price]');
  var MIN_PRICE_VALUES = ['1000', '5000', '0', '10000'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];

  var userForm = document.querySelector('.notice__form');

  var setMin = function (element, value) {
    element.min = value;
  };

  synchronizeFields(roomsElement, ROOMS_VALUES, guestsElement, GUESTS_VALUES);
  synchronizeFields(checkInElement, CHECK_IN_TIMES, checkOutElement, CHECK_OUT_TIMES);
  synchronizeFields(checkOutElement, CHECK_OUT_TIMES, checkInElement, CHECK_IN_TIMES);
  synchronizeFields(typeElement, TYPES_VALUES, priceElement, MIN_PRICE_VALUES, setMin);

  window.pin.createUserPin(function (x, y) {
    document.querySelector('[name=address]').value = 'x: ' + x + ', y: ' + y;
  });

  var onLoad = function () {
    window.notification.showSuccessNotify('Ваше объявление успешно добавлено!');
    userForm.reset();
  };

  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), onLoad, window.notification.showErrorNotify);
    evt.preventDefault();
  });
}());
