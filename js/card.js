'use strict';
window.card = (function () {
  var TYPES_DICTIONARY = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Лачуга', 'palace': 'Дворец'}; // создаем словарик для типов жилья offer.type


  var templateContent = document.querySelector('template').content; // достаем контент template!!!
  var mapCard = templateContent.querySelector('article.map__card').cloneNode(true); // достаем mapCard из templateContent и клонируем вместе с содержимым

  var createPopup = function (advert) {
    // далее помещаем данные в шаблон контент template:
    mapCard.querySelector('h3').textContent = advert.offer.title; // в templateContent находим элемент h3 и помещаем в него title
    mapCard.querySelector('p small').textContent = advert.offer.address;
    mapCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20bd/ночь'; // textContent не используем тк не отображает символ рубля
    mapCard.querySelector('h4').textContent = TYPES_DICTIONARY[advert.offer.type]; // обращаемся к св-ву словаря через [], чтобы вывести альтернативное название типа жилья
    mapCard.querySelectorAll('p')[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей'; // находим <p> по порядковому номеру
    mapCard.querySelectorAll('p')[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    mapCard.querySelectorAll('p')[4].textContent = advert.offer.description;
    mapCard.querySelector('.popup__avatar').src = advert.author.avatar;

    mapCard.querySelector('ul.popup__features').innerHTML = ''; // обращаемся к содержимому ul и удаляем, присвоив пустую строку
    for (var i = 0; i < advert.offer.features.length; i++) {
      var feature = advert.offer.features[i];
      var featureLi = document.createElement('li'); // создаем элемент li
      featureLi.classList.add('feature', 'feature--' + feature); // добавляем созданному элементу нужный класс
      mapCard.querySelector('ul').appendChild(featureLi); // добавляем созданный элемент в список
    }
    return mapCard;
  };


  var closePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var displayPopup = function (advert) {
    createPopup(advert);
    document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container')); // вставляет переменную mapCard в блок .map перед блоком .map__filters-container
    document.querySelector('.popup__close').addEventListener('click', closePopup);
  };

  return {createPopup: createPopup, displayPopup: displayPopup, closePopup: closePopup};
}());
