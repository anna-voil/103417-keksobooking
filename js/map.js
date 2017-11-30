'use strict';
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var houseType = ['flat', 'house', 'bungalo'];
var checkIn = ['12:00', '13:00', '14:00'];
var checkOut = ['12:00', '13:00', '14:00'];


// возвращает случайное число элементов массива
function getRandomElements(arr) {
  var arrCopy = arr.slice(); // создаем копию, чтобы не удалить элементы из оригинального массива
  var randomElements = []; // hotelFeatures
  var randomElementsCount = getRandomNum(0, arrCopy.length); // определяем число взятых из массива эл-тов
  for (var i = 0; i < randomElementsCount; i++) {
    randomElements.push(getAndRemoveElement(arrCopy)); // добавляем циклом нужное кол-во элементов массива arr
  }
  return randomElements;
}

// возвращает случайное число из диапазона. Для массива max = arr.length
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// возвращает случайный элемент массива
function getRandomElement(arr) {
  var randomIndex = getRandomNum(0, arr.length);
  return arr[randomIndex];
}

// возвращает случайный элемент массива одновременно удаляя его из массива
function getAndRemoveElement(arr) {
  var randomIndex = getRandomNum(0, arr.length);
  var removedElements = arr.splice(randomIndex, 1); // в новый массив removedElements берем рандомный элемент массива arr(индекс эл-та массива с которого удаляем, кол-во удаляемых эл-тов)
  return removedElements[0]; // возвращает удаленный элемент
}


var adverts = generateObjects(8);

function generateObjects(num) { // определённое кол-во раз генерирует объект
  var result = [];
  for (var i = 0; i < num; i++) {
    var coords = {
      x: getRandomNum(300, 900),
      y: getRandomNum(100, 500)
    };

    var advert = {
      author: {
        avatar: 'img/avatars/user' + getAndRemoveElement(avatars) + '.png'
      },

      offer: {
        title: getRandomElement(titles),
        address: coords.x + ', ' + coords.y,
        price: getRandomNum(1000, 1000000),
        type: getRandomElement(houseType),
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 15),
        checkin: getRandomElement(checkIn),
        checkout: getRandomElement(checkOut),
        features: getRandomElements(features),
        description: '',
        photos: []
      },

      location: coords
    };
    result.push(advert);
  }
  return result;
}

// удаляем класс .map--faded из элемента .map
document.querySelector('.map').classList.remove('map--faded');

// функция показывает дом-элементы на карте
function displayAdvertsOnMap(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) { // проходим циклом по массиву для отрисовки его элементов в виде дом-объектов
    var advert = arr[i];
    var newElement = document.createElement('button'); // создаём дом-элемент <button> (arr[i])
    newElement.className = 'map__pin'; // задаем класс элемента
    newElement.style = 'left:' + (advert.location.x - 20) + 'px; top:' + (advert.location.y - 50) + 'px;';
    fragment.appendChild(newElement); // добавляем элемент в var fragment
    newElement.innerHTML = '<img src="' + advert.author.avatar + '" width="40" height="40" draggable="false">';
  }
  var mapPins = document.querySelector('.map__pins'); // находим элемент с классом map__pins
  mapPins.appendChild(fragment); // добавляем в элемент с классом map__pins элемент fragment, внутри которого находятся дом-элементы, соответствующие объявлениям
}

displayAdvertsOnMap(adverts);

var typesDictionary = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'}; // создаем словарик для типов жилья offer.type

function displayOneAdvertOnMap(advert) {
  // var template = document.querySelector('template').content.querySelector('article.map__card'); // находим и передаем в переменную элемент шаблона из html
  // var mapCard = template.cloneNode(true); // копируем переменную template, чтобы не изменялся исходный шаблон (true указывает на копирование дочерних эл-тов)
  // mapCard = document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container')); // вставляет переменную mapCard в блок .map перед блоком .map__filters-container

  var templateContent = document.querySelector('template').content; // достаем контент template!!!

  // переписываем закомментированные строки добавления шаблона в документ + см. последнюю строку ф-ии
  var mapCard = templateContent.querySelector('article.map__card').cloneNode(true); // достаем mapCard из templateContent и клонируем вместе с содержимым

  mapCard.querySelector('h3').textContent = advert.offer.title; // в templateContent находим элемент h3 и помещаем в него title

  // далее помещаем данные в шаблон контент template:
  mapCard.querySelector('p small').textContent = advert.offer.address;

  mapCard.querySelector('.popup__price').innerHTML = advert.offer.price + ' &#x20bd;/ночь'; // textContent не используем тк не отображает символ рубля

  mapCard.querySelector('h4').textContent = typesDictionary[advert.offer.type]; // обращаемся к св-ву словаря через [], чтобы вывести альтернативное название типа жилья

  mapCard.querySelectorAll('p')[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей'; // находим <p> по порядковому номеру

  mapCard.querySelectorAll('p')[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  // mapCard.querySelector('popup__features').

  mapCard.querySelectorAll('p')[4].textContent = advert.offer.description;

  mapCard.querySelector('.popup__avatar').src = advert.author.avatar;

  mapCard = document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container')); // вставляет переменную mapCard в блок .map перед блоком .map__filters-container

}
displayOneAdvertOnMap(adverts[0]);


/* eslint-disable */
/*

               В список .popup__features выведите все доступные удобства в квартире из массива {{offer.features}} пустыми элементами списка (<li>) с классом feature feature--{{название удобства}}


*/
/* eslint-enable */
