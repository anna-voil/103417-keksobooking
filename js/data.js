'use strict';

window.data = (function () {
  var HOUSE_TYPE = ['flat', 'house', 'bungalo', 'palace'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
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

  return {adverts: adverts, ESC_KEYCODE: ESC_KEYCODE, ENTER_KEYCODE: ENTER_KEYCODE, HOUSE_TYPE: HOUSE_TYPE, FEATURES: FEATURES, TITLES: TITLES, CHECK_IN: CHECK_IN, CHECK_OUT: CHECK_OUT};
}());
