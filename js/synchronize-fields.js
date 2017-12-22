'use strict';
window.synchronizeFields = (function () {
  var setValue = function (element, value) { // устанавливает значение value элементу input
    element.value = value;
  };

  var synchronizeInputs = function (element1, array1, element2, array2, callback) { // синхронизирует значения 2-х input-ов
    var cb = callback || setValue;
    var onChange = function () {
      var targetElementValue = array2[array1.indexOf(element1.value)];
      cb(element2, targetElementValue);
    };
    element1.addEventListener('change', onChange); // синхронизация при изменении значения эл-та
    onChange(); // синхронизация сразу при загрузке страницы
  };
  return synchronizeInputs;
})();
