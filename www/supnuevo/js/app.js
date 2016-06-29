angular.module('app',['ionic','ui.router','ngCordova','locals'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('verify',{
      url:'/verify',
      controller: 'verifyController',
    })
    $stateProvider.state('login',{
            url:'/login',
            controller: 'loginController',
            templateUrl:'supnuevo/html/login.html'
        })
        $stateProvider.state('query',{
            url:'/query',
            controller: 'queryController',
            templateUrl:'supnuevo/html/query.html'
    })
    $stateProvider.state('addGoods',{
      url:'/addGoods?taxName&sizeArr',
      controller: 'addGoodsController',
      templateUrl:'supnuevo/html/addGoods.html'
    })
    $urlRouterProvider.otherwise('/login');
    })
  .controller('verifyController',function($cordovaFile){
    $cordovaFile.readAsText(cordova.file.dataDirectory, "1.txt")
      .then(function (success) {
        alert(success);
      }, function (error) {
        alert(error);
      });

    //$cordovaFile.readAsText(cordova.file.applicationDirectory,'www/supnuevo/file/userInfo.json').then(function(success){
    //  alert("aaa");
    //},function(error){
    //  alert(error);
    //});

  })
  .constant("rmiPath","http://158.69.137.173:80")
  //.constant("rmiPath","http:://211.87.225.207:8080/supnuevo")
  //.constant("rmiPath","http:://211.87.225.195:8080/supnuevo")

