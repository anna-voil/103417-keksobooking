'use strict';
window.map = (function () {

  var allAdverts = []; // массив, фильтрация


  var onEscKeydown = function (event) {
    if (event.keyCode === window.data.ESC_KEYCODE) {
      window.pin.deselectActivePin();
    }
  };
  document.addEventListener('keydown', onEscKeydown);

  var map = document.querySelector('.map');
  var userMapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  var updatePins = function () { // удаление и отрисовка пинов при фильтрации
    var filteredAdverts = window.filters.filterAdverts(allAdverts);
    window.pin.displayAdvertsOnMap(filteredAdverts);
  };

  var onLoad = function (adverts) {
    allAdverts = adverts;
    updatePins();
  };

  function showMain() {
    window.backend.load(onLoad, window.notification.error);

    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
  }

  userMapPinMain.addEventListener('keydown', function (event) {
    if (event.keyCode === window.data.ENTER_KEYCODE) {
      showMain();
    }
  });
  userMapPinMain.addEventListener('mouseup', showMain);

  var MAP_LIMITS = {
    minX: 0,
    maxX: map.clientWidth,
    minY: 100,
    maxY: 500
  };
  return {MAP_LIMITS: MAP_LIMITS, updatePins: updatePins};
}());
