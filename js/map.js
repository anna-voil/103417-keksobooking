'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];


// возвращает случайное число элементов массива
function getRandomElements(arr, count) {
  var arrCopy = arr.slice(); // создаем копию, чтобы не удалить элементы из оригинального массива
  var randomElements = []; // hotelFeatures
  for (var i = 0; i < count; i++) {
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
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomElement(TITLES),
        address: coords.x + ', ' + coords.y,
        price: getRandomNum(1000, 1000000),
        type: getRandomElement(HOUSE_TYPE),
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 15),
        checkin: getRandomElement(CHECK_IN),
        checkout: getRandomElement(CHECK_OUT),
        features: getRandomElements(FEATURES, getRandomNum(0, FEATURES.length)),
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
function createPinElement(advert) {
  var newElement = document.createElement('button'); // создаём дом-элемент <button> (arr[i])
  newElement.className = 'map__pin'; // задаем класс элемента
  newElement.style = 'left:' + (advert.location.x - 20) + 'px; top:' + (advert.location.y - 50) + 'px;';
  newElement.innerHTML = '<img src="' + advert.author.avatar + '" width="40" height="40" draggable="false">';
  return newElement;
}
function displayAdvertsOnMap(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) { // проходим циклом по массиву для отрисовки его элементов в виде дом-объектов
    var advert = arr[i];
    var newElement = createPinElement(advert);
    fragment.appendChild(newElement); // добавляем элемент в var fragment
  }
  var mapPins = document.querySelector('.map__pins'); // находим элемент с классом map__pins
  mapPins.appendChild(fragment); // добавляем в элемент с классом map__pins элемент fragment, внутри которого находятся дом-элементы, соответствующие объявлениям
}

displayAdvertsOnMap(adverts);

var TYPES_DICTIONARY = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'}; // создаем словарик для типов жилья offer.type

function displayOneAdvertOnMap(advert) {
  var templateContent = document.querySelector('template').content; // достаем контент template!!!

  var mapCard = templateContent.querySelector('article.map__card').cloneNode(true); // достаем mapCard из templateContent и клонируем вместе с содержимым

  // далее помещаем данные в шаблон контент template:
  mapCard.querySelector('h3').textContent = advert.offer.title; // в templateContent находим элемент h3 и помещаем в него title
  mapCard.querySelector('p small').textContent = advert.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = advert.offer.price + ' &#x20bd;/ночь'; // textContent не используем тк не отображает символ рубля
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

  mapCard = document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container')); // вставляет переменную mapCard в блок .map перед блоком .map__filters-container
}
displayOneAdvertOnMap(adverts[0]);
