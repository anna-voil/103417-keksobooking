'use strict';
(function () {
  var PIN_OFFSET_X = 20;
  var PIN_OFFSET_Y = 50;
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;

  var deselectActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // функция показывает дом-элементы на карте
  var createPinElement = function (advert) {
    var newElement = document.createElement('button'); // создаём дом-элемент <button> (arr[i])
    newElement.className = 'map__pin'; // задаем класс элемента
    newElement.style.left = (advert.location.x - PIN_OFFSET_X) + 'px';
    newElement.style.top = (advert.location.y - PIN_OFFSET_Y) + 'px';

    var pinImgElement = document.createElement('img');
    pinImgElement.src = advert.author.avatar;
    pinImgElement.width = AVATAR_WIDTH;
    pinImgElement.height = AVATAR_HEIGHT;
    pinImgElement.draggable = false;

    newElement.appendChild(pinImgElement);

    var onSelectPin = function () {
      deselectActivePin();
      newElement.classList.add('map__pin--active');
      window.showCard(advert);
    };
    newElement.addEventListener('keydown', function (event) {
      if (event.keyCode === window.utils.ENTER_KEYCODE) {
        onSelectPin();
      }
    });
    newElement.addEventListener('click', onSelectPin);
    return newElement;
  };

  var mapPinsElement = document.querySelector('.map__pins'); // находим элемент с классом map__pins
  var displayAdvertsOnMap = function (offers) {
    var allPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // находим пины, которые нужно удалить (все кроме userPin)
    for (var j = 0; j < allPinElements.length; j++) {
      allPinElements[j].remove();
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) { // проходим циклом по массиву для отрисовки его элементов в виде дом-объектов
      var advert = offers[i];
      var newElement = createPinElement(advert);
      fragment.appendChild(newElement); // добавляем элемент в var fragment
    }
    mapPinsElement.appendChild(fragment); // добавляем в элемент с классом map__pins элемент fragment, внутри которого находятся дом-элементы, соответствующие объявлениям
  };

  var createUserPin = function (onChangePosition) {
    var userPin = document.querySelector('button.map__pin--main');
    onChangePosition(userPin.offsetLeft, userPin.offsetTop);
    userPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var startOffset = {
        x: userPin.offsetLeft,
        y: userPin.offsetTop
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var userCoords = {
          x: startOffset.x - shift.x,
          y: startOffset.y - shift.y
        };
        var mapLimits = window.map.MAP_LIMITS;
        userCoords = {
          x: Math.min(mapLimits.MAX_X, Math.max(mapLimits.MIN_X, userCoords.x)),
          y: Math.min(mapLimits.MAX_Y, Math.max(mapLimits.MIN_Y, userCoords.y))
        };

        userPin.style.top = userCoords.y + 'px';
        userPin.style.left = userCoords.x + 'px';

        onChangePosition(userCoords.x, userCoords.y);
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  window.pin = {deselectActivePin: deselectActivePin, displayAdvertsOnMap: displayAdvertsOnMap, createUserPin: createUserPin};
}());
