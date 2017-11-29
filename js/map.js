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
  var randomElements = []; //hotelFeatures
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
