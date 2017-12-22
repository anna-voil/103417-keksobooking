'use strict';

(function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var ITEMS_LIMIT = 5;
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');

  var mapFiltersElement = document.querySelector('.map__filters');

  mapFiltersElement.addEventListener('change', function () { // вызов перерисовки пинов при фильтрации
    window.debounce(window.map.updatePins);
  });

  var isAny = function (element) {
    return element.value === 'any';
  };

  var checkType = function (advert) { // фильтрация типов жилья
    return isAny(housingTypeElement) || housingTypeElement.value === advert.offer.type;
  };

  var checkPrice = function (advert) { // фильтрация цен
    switch (housingPriceElement.value) {
      case 'middle':
        return advert.offer.price > MIN_PRICE && advert.offer.price < MAX_PRICE;
      case 'low':
        return advert.offer.price < MIN_PRICE;
      case 'high':
        return advert.offer.price > MAX_PRICE;
      default: return true;
    }
  };

  var checkRooms = function (advert) { // фильтрация по количеству комнат
    return isAny(housingRoomsElement) || Number(housingRoomsElement.value) === advert.offer.rooms;
  };

  var checkGuests = function (advert) { // фильтрация количества гостей
    return isAny(housingGuestsElement) || Number(housingGuestsElement.value) === advert.offer.guests;
  };

  var checkFeatures = function (advert) {
    var checkedFeatures = housingFeaturesElement.querySelectorAll('input:checked');
    for (var i = 0; i < checkedFeatures.length; i++) {
      var feature = checkedFeatures[i].value;
      if (advert.offer.features.indexOf(feature) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterAdverts = function (adverts) {
    return adverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) && checkRooms(advert) && checkGuests(advert) && checkFeatures(advert);
    }).slice(0, ITEMS_LIMIT);

  };

  window.filters = {filterAdverts: filterAdverts};
}());
