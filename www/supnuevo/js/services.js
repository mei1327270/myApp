/**
 * 服务
 */
angular.module('services', ['ngCordova'])
  // Toast服务
  .service('ToastService', ['$cordovaToast', function ($cordovaToast) {
    return {
      showShortTop: function (message) {
        $cordovaToast.showShortTop(message);
      },
      showShortCenter: function (message) {
        $cordovaToast.showShortCenter(message);
      },
      showShortBottom: function (message) {
        $cordovaToast.showShortBottom(message);
      },
      showLongTop: function (message) {
        $cordovaToast.showLongTop(message);
      },
      showLongCenter: function (message) {
        $cordovaToast.showLongCenter(message);
      },
      showLongBottom: function (message) {
        $cordovaToast.showLongBottom(message);
      }
    }
  }]
)



