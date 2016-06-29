angular.module('app')
.controller('loginController',function($scope,$state,$ionicLoading,$http,$cordovaProgress,$cordovaNetwork,$cordovaCamera,locals,rmiPath){
    $scope.user = [{
      'username':'',
      'password':'',
    }];

    $scope.username=new Object();
    $scope.password= new Object();
    $scope.change = function(){
      console.log($scope.user.username);
    }
    $scope.doClear1 = function(){
      var username = $scope.user.username;
      if(username !== null && username !== undefined && username !== "")
        $scope.user.username="";
    }
    $scope.doClear2 = function(){
      var password = $scope.user.password;
      if(password !== null && password !== undefined && password !== "")
        $scope.user.password="";
    }
    $scope.goQuery1 = function(){
      $state.go("query");
    }
    $scope.goQuery = function(){
      var status = $cordovaNetwork.getNetwork();
      if($cordovaNetwork.isOnline()){

        var user = $scope.user;
        if(user.username === null || user.username === undefined || user.username === ''){
          alert("用户名不能为空");
          return false;
        }
        if(user.password === null || user.password === undefined || user.password === ''){
          alert("密码不能为空");
          return false;
        }else{
          $cordovaProgress.show(true);
        }
        $http({
          method:"post",
          params:{
            loginName:user.username,
            password:user.password
          },
          url:rmiPath+"/supnuevo/supnuevoGetUserLoginJSONObjectMobile.do",

        }).success(function(response){
          var errorMsg =  response.errorMsg;
          if(errorMsg !== null && errorMsg !== undefined && errorMsg !== ""){
            alert(errorMsg);
            $cordovaProgress.hide();
          }else{
            var supnuevoMerchantId = response.merchantId;
            locals.set("username",user.username);
            locals.set("password",user.password);
            locals.set("supnuevoMerchantId",supnuevoMerchantId);
            $state.go("query");
            $cordovaProgress.hide();
          }
        }).error(function(err){
            alert(err.toSource());
            $ionicLoading.show({
              template:'connect the server timeout',
              duration:'2000'
            });
        })
      }else{
        $ionicLoading.show({
          template:'could not connect the server',
          duration:'2000'
        });
      }
    }
  $scope.doPhoto = function(){
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        $scope.imageSrc= imageURI;
      }, function(err) {
        // error
      });
  }
  })
  //.service('ToastService', ['$cordovaToast', function ($cordovaToast) {
  //  return {
  //    showShortTop: function (message) {
  //      $cordovaToast.showShortTop(message);
  //    },
  //    showShortCenter: function (message) {
  //      $cordovaToast.showShortCenter(message);
  //    },
  //    showShortBottom: function (message) {
  //      $cordovaToast.showShortBottom(message);
  //    },
  //    showLongTop: function (message) {
  //      $cordovaToast.showLongTop(message);
  //    },
  //    showLongCenter: function (message) {
  //      $cordovaToast.showLongCenter(message);
  //    },
  //    showLongBottom: function (message) {
  //      $cordovaToast.showLongBottom(message);
  //    }
  //  }
  //}])
   .run(['$ionicPlatform', '$ionicPopup','$rootScope','$cordovaToast','$state','$ionicHistory',function($ionicPlatform, $ionicPopup,$rootScope,$cordovaToast,$state,$ionicHistory){
    // 双击退出
    $ionicPlatform.registerBackButtonAction(function (e) {
      if ($state.includes('login')) {
        if ($rootScope.backButtonPressedOnceToExit) {
          //退出前保存统计数据

          ionic.Platform.exitApp();
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          $cordovaToast.showShortBottom('再按一次退出系统');
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
      } else if ($state.includes('addGoods')) {
        $state.go('query');
      }
      else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      }
      e.preventDefault();
      return false;
    }, 101);
  }])
