'use strict';

window.filters = (function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');

  var mapFiltersElement = document.querySelector('.map__filters');

  mapFiltersElement.addEventListener('change', function () { // вызов перерисовки пинов при фильтрации
    window.debounce(window.map.updatePins);
  });

  var checkType = function (advert) { // фильтрация типов жилья
    return housingTypeElement.value === 'any' || housingTypeElement.value === advert.offer.type;
  };

  var checkPrice = function (advert) { // фильтрация цен
    switch (housingPriceElement.value) {
      case 'any':
        return true;
      case 'middle':
        return advert.offer.price > 10000 && advert.offer.price < 50000;
      case 'low':
        return advert.offer.price < 10000;
      case 'high':
        return advert.offer.price > 50000;
      default: return true;
    }
  };

  var checkRooms = function (advert) { // фильтрация по количеству комнат
    return housingRoomsElement.value === 'any' || Number(housingRoomsElement.value) === advert.offer.rooms;
  };

  var checkGuests = function (advert) { // фильтрация количества гостей
    return housingGuestsElement.value === 'any' || Number(housingGuestsElement.value) === advert.offer.guests;
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
    }).slice(0, 5);

  };

  return {filterAdverts: filterAdverts};
}());
