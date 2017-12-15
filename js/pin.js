'use strict';
window.pin = (function () {
  var PIN_OFFSET_X = 20;
  var PIN_OFFSET_Y = 50;

  var deselectActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // функция показывает дом-элементы на карте
  function createPinElement(advert) {
    var newElement = document.createElement('button'); // создаём дом-элемент <button> (arr[i])
    newElement.className = 'map__pin'; // задаем класс элемента
    newElement.style = 'left:' + (advert.location.x - PIN_OFFSET_X) + 'px; top:' + (advert.location.y - PIN_OFFSET_Y) + 'px;';
    newElement.innerHTML = '<img src="' + advert.author.avatar + '" width="40" height="40" draggable="false">';

    var onSelectPin = function () {
      deselectActivePin();
      newElement.classList.add('map__pin--active');
      window.card.displayPopup(advert);
    };
    newElement.addEventListener('keydown', function (event) {
      if (event.keyCode === window.data.ENTER_KEYCODE) {
        onSelectPin();
      }
    });
    newElement.addEventListener('click', onSelectPin);
    return newElement;
  }


  var displayAdvertsOnMap = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) { // проходим циклом по массиву для отрисовки его элементов в виде дом-объектов
      var advert = arr[i];
      var newElement = createPinElement(advert);
      fragment.appendChild(newElement); // добавляем элемент в var fragment
    }
    var mapPins = document.querySelector('.map__pins'); // находим элемент с классом map__pins
    mapPins.appendChild(fragment); // добавляем в элемент с классом map__pins элемент fragment, внутри которого находятся дом-элементы, соответствующие объявлениям
  };

  var USER_PIN = document.querySelector('button.map__pin--main');

  USER_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      USER_PIN.style.top = (USER_PIN.offsetTop - shift.y) + 'px';
      USER_PIN.style.left = (USER_PIN.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {deselectActivePin: deselectActivePin, displayAdvertsOnMap: displayAdvertsOnMap};
}());
