'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var MAP_LIMITS = {
    MIN_X: 0,
    MAX_X: mapElement.clientWidth,
    MIN_Y: 100,
    MAX_Y: 500
  };
  var allAdverts = []; // массив, фильтрация

  var onEscKeydown = function (event) {
    if (event.keyCode === window.utils.ESC_KEYCODE) {
      window.pin.deselectActivePin();
    }
  };
  document.addEventListener('keydown', onEscKeydown);

  var userMapPinMainElement = document.querySelector('.map__pin--main');
  var noticeFormElement = document.querySelector('.notice__form');

  var updatePins = function () { // удаление и отрисовка пинов при фильтрации
    var filteredAdverts = window.filters.filterAdverts(allAdverts);
    window.pin.displayAdvertsOnMap(filteredAdverts);
  };

  var onLoad = function (adverts) {
    allAdverts = adverts;
    updatePins();
  };

  var showMain = function () {
    window.backend.load(onLoad, window.notification.showErrorNotify);

    mapElement.classList.remove('map--faded');
    noticeFormElement.classList.remove('notice__form--disabled');
  };

  userMapPinMainElement.addEventListener('keydown', function (event) {
    if (event.keyCode === window.utils.ENTER_KEYCODE) {
      showMain();
    }
  });
  userMapPinMainElement.addEventListener('mouseup', showMain);

  window.map = {MAP_LIMITS: MAP_LIMITS, updatePins: updatePins};
}());
