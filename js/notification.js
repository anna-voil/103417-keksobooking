'use strict';

window.notification = (function () {
  var closeNotification = function () {
    var notificationElement = document.querySelector('article.notification');
    if (notificationElement) {
      notificationElement.remove();
    }
  };

  var templateContent = document.querySelector('template').content; // достаем контент template

  var showNotification = function (message, isSuccess) {
    var notification = templateContent.querySelector('article.notification').cloneNode(true); // достаем notification из templateContent
    notification.querySelector('.notification__text').textContent = message;
    notification.classList.add('notification--' + (isSuccess ? 'success' : 'error'));
    document.querySelector('body').appendChild(notification);
    notification.querySelector('.notification__close').addEventListener('click', closeNotification);
  };

  var showSuccessNotify = function (message) {
    showNotification(message, true);
  };

  var showErrorNotify = function (message) {
    showNotification(message, false);
  };
  return {showSuccessNotify: showSuccessNotify, showErrorNotify: showErrorNotify};
}());
