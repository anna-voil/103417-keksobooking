'use strict';
window.map = (function () {

  var allAdverts = []; // массив, фильтрация


  var onEscKeydown = function (event) {
    if (event.keyCode === window.data.ESC_KEYCODE) {
      window.pin.deselectActivePin();
    }
  };
  document.addEventListener('keydown', onEscKeydown);

  var mapElement = document.querySelector('.map');
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
    if (event.keyCode === window.data.ENTER_KEYCODE) {
      showMain();
    }
  });
  userMapPinMainElement.addEventListener('mouseup', showMain);

  var MAP_LIMITS = {
    minX: 0,
    maxX: mapElement.clientWidth,
    minY: 100,
    maxY: 500
  };
  return {MAP_LIMITS: MAP_LIMITS, updatePins: updatePins};
}());
