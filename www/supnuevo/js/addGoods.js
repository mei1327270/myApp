angular.module('app')
  .controller('addGoodsController',function($scope,$state,locals,$http,$stateParams,rmiPath){
    $scope.commodity = {
      username:locals.get('username',''),
      codigo :'',
      nombre : '',
      sizeValue:'',
      sizeUnited:'',
      scaleUnited:'',
      taxId:'',
    }
    $scope.commodityTax = new Array();
    $scope.sizeUnit = new Array();
    $scope.scaleUnit = new Array();
    var taxName = $stateParams.taxName;
    var sizeArr = $stateParams.sizeArr;
    var tax = JSON.parse(taxName);
    var sizeArrJSON = JSON.parse(sizeArr);
    for(var i = 0; i < tax.length;i++){
      $scope.commodityTax.push(tax[i]);
    }
    for(var i = 0; i < sizeArrJSON.length;i++){
      $scope.sizeUnit.push(sizeArrJSON[i]);
    }

    $scope.goBack = function(){
      $state.go("query");
    }
    $scope.changeSizeUnit = function(){
      $scope.scaleUnit = [];
      var val = $scope.commodity.sizeUnited;
      if(val !== null && val !== undefined && val !== ""){
        $http({
          method:"post",
          params:{sizeUnit:val},
          url:rmiPath+"/supnuevo/supnuevoGetSupnuevoScaleInfoListMobile.do",
        }).success(function(response){
          var scaleArr = new Array();
          response.scaleArr.map(function(index,i){
            scaleArr.push(index);
          })
          for(var i = 0 ; i < scaleArr.length;i++){
            var o = {'value':'','label':''};
            o.label = scaleArr[i].label;
            o.value = scaleArr[i].value;
            $scope.scaleUnit.push(o);
          }
        }).error(function(){

        })
      }

    }
    $scope.changeScaleUnit = function(){

    }
    $scope.changeTax = function(){

    }
    $scope.addSupnuevoCommonCommodity = function(){
    var codigo = $scope.commodity.codigo;
    var taxId = $scope.commodity.taxId;
    var nombre = $scope.commodity.nombre;
    var sizeValue = $scope.commodity.sizeValue;
    var sizeUnited = $scope.commodity.sizeUnited;
    var scaleUnited = $scope.commodity.scaleUnited;
    var supnuevoMerchantId = locals.get('supnuevoMerchantId','');
      if(codigo === null || codigo === undefined || codigo === ''){
       alert("商品条码不能为空");
       return false;
     }
      if(taxId === null || taxId === undefined || taxId === ''){
        alert("商品税类不能为空");
        return false;
      }
      if(nombre === null || nombre === undefined || nombre === ''){
        alert("商品名称不能为空");
        return false;
      }
      if(sizeValue === null || sizeValue === undefined || sizeValue === ''){
        alert("商品含量不能为空");
        return false;
      }
      if(sizeUnited === null || sizeUnited === undefined || sizeUnited === ''){
        alert("含量单位不能为空");
        return false;
      }
      if(scaleUnited === null || scaleUnited === undefined || scaleUnited === ''){
        alert("比价单位不能为空");
        return false;
      }
      $http({
      method:"post",
      params:{
        taxId:taxId,
        codigo:codigo,
        supnuevoMerchantId:supnuevoMerchantId,
        nombre:nombre,
        sizeValue:sizeValue,
        sizeUnited:sizeUnited,
        scaleUnited:scaleUnited
      },
      url:rmiPath+"/supnuevo/supnuevoAddSupnuevoCommonCommodityMobile.do",
    }).success(function(response){
      var errorMsg = response.errorMsg;
      var message = response.message;
      if(errorMsg !== null && errorMsg !== undefined && errorMsg !== ""){
        alert(errorMsg);
        $scope.commodity = {
          codigo :'',
          nombre : '',
          sizeValue:'',
          sizeUnited:'',
          scaleUnited:'',
          taxId:'',
        }
      }
        if(message !== null && message !== undefined && message !== ""){
          alert(message);
          $scope.commodity = {
            codigo :'',
            nombre : '',
            sizeValue:'',
            sizeUnited:'',
            scaleUnited:'',
            taxId:'',
          }
        }

    }).error(function(err){
      alert(err);
    })
    }
  })
