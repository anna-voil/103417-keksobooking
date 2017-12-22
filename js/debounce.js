'use strict';
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;
  return function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();