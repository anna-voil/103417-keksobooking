'use strict';
window.map = (function () {

  var onEscKeydown = function (event) {
    if (event.keyCode === window.data.ESC_KEYCODE) {
      deselectPinAndClosePopup();
    }
  };
  document.addEventListener('keydown', onEscKeydown);

  var map = document.querySelector('.map');
  var userMapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  function showMain() {
    window.pin.displayAdvertsOnMap(window.data.adverts);
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
  }

  userMapPinMain.addEventListener('keydown', function (event) {
    if (event.keyCode === window.data.ENTER_KEYCODE) {
      showMain();
    }
  });
  userMapPinMain.addEventListener('mouseup', showMain);

  var deselectPinAndClosePopup = function () {
    window.pin.deselectActivePin();
    window.card.closePopup();
  };

  var mapLimits = {
    minX: 0,
    maxX: map.clientWidth,
    minY: 100,
    maxY: 500
  };
  return {mapLimits: mapLimits};
}());
