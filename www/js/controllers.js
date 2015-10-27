angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ApplyCtrl',function($scope,$ionicModal,$ionicLoading,$timeout){

  	$scope.ApplyParams = {
  		name:'',
  		address:'',
  		phone:'',
  		vercode:'',
  		applys:[],

  	};

    var HUD = function(template){

      $ionicLoading.show({
          template:template
      })

      $timeout(function(){
            $ionicLoading.hide()
        },1500);
    };

	  $scope.PerApplyParams = {
        work_type:'',
        num:'',
        startDateStr:'',
        endDateStr:'',
        startTimeStr:'',
        endTimeStr:''
    };

	  $scope.work_type = ['服务员','洗碗工','配送员','传菜员'];
	  $scope.PhoneTips = false;
	  $scope.VerCodeTips = false;

    $ionicModal.fromTemplateUrl('templates/applys.html',{
        scope:$scope
    }).then(function(modal){
      	$scope.applysModal = modal;
    });

  	$ionicModal.fromTemplateUrl('templates/datePicker.html',{
      	scope:$scope
  	}).then(function(modal){
    	$scope.datePickerModal = modal;
  	});

  	$scope.startDate = function(){
  		$scope.dateType = true;
  		$scope.datePickerModal.show();
  	};

  	$scope.endDate = function(){
  		$scope.dateType = false;
  		$scope.datePickerModal.show();  		
  	};


  	$scope.options = {
    	defaultDate: new Date(),
    	minDate: "2015-01-01",
    	maxDate: "2016-12-31",
    	dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    	mondayIsFirstDay: true,//set monday as first day of week. Default is false

    	dateClick: function(date) {
    		if ($scope.dateType){
          if (date.date < new Date()){
              HUD('上工日期应晚于今天');
          }else if ($scope.PerApplyParams.endDate && date.date > $scope.PerApplyParams.endDate.date){
              HUD('上工日期应早于结束日期');
          }else{
              $scope.PerApplyParams.startDate = date;
              $scope.PerApplyParams.startDateStr = (date.month + 1) + '月' + date.day + '日' ;
              $scope.datePickerModal.hide() ;           
          }

    		}else{
          if ($scope.PerApplyParams.startDate && date.date < $scope.PerApplyParams.startDate.date){
              HUD('结束日期应晚于上工日期');
          }else if (date.date < new Date()){
              HUD('结束日期应晚于今天');
          }else{
              $scope.PerApplyParams.endDate = date;
              $scope.PerApplyParams.endDateStr = (date.month + 1) + '月' + date.day + '日';
              $scope.datePickerModal.hide();            
          }
   			
    		}
        	     
    	},
    	changeMonth: function(month, year) {
        
    	},
  	};
    $scope.timePickerObject = {
      inputEpochTime: (8 * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 24,  //Optional
      titleLabel: '选择上班时间',  //Optional
      setLabel: '选择',  //Optional
      closeLabel: '关闭',  //Optional
      setButtonType: 'button-balanced',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };

    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        if (selectedTime.getUTCMinutes() === 0){
            $scope.PerApplyParams.startTimeStr = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes()+'0'
        }else{
            $scope.PerApplyParams.startTimeStr = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes()
        }
      }
    };

    $scope.timePickerObject_end = {
      inputEpochTime: (18 * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 24,  //Optional
      titleLabel: '选择完工时间',  //Optional
      setLabel: '选择',  //Optional
      closeLabel: '关闭',  //Optional
      setButtonType: 'button-balanced',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback_end(val);
      }
    };

    function timePickerCallback_end(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
        if (selectedTime.getUTCMinutes() === 0){
            $scope.PerApplyParams.endTimeStr = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes()+'0'
        }else{
            $scope.PerApplyParams.endTimeStr = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes()
        }
        
      }
    };


    $scope.saveApplying = function(){

      var canAdd = true;
      if ($scope.PerApplyParams.work_type.length > 0){
          $scope.work_typeTip = false;
      }else{
          $scope.work_typeTip = true;
          canAdd = false;
      } 
      if($scope.PerApplyParams.num.length > 0){
          $scope.numTip = false;
      }else{
          $scope.numTip = true;
          canAdd = false;
      }
      if ($scope.PerApplyParams.startDateStr.length > 0){
          $scope.startDateTip = false;
      }else{
          $scope.startDateTip = true;
          canAdd = false;
      }
      if ($scope.PerApplyParams.endDateStr.length > 0){
          $scope.endDateTip = false;
      }else{
          $scope.endDateTip = true;
          canAdd = false;
      }
      if ($scope.PerApplyParams.startTimeStr.length > 0){
          $scope.startTimeTip = false;
      }else{
          $scope.startTimeTip = true;
          canAdd = false;
      }
      if ($scope.PerApplyParams.endTimeStr.length > 0){
          $scope.endTimeTip = false;
      }else {
          $scope.endTimeTip = true;
          canAdd = false;
      }

      if (canAdd){
          $scope.ApplyParams.applys.push($scope.PerApplyParams);
          $scope.applysStr = '共'+$scope.ApplyParams.applys.length + '个需求'
          $scope.PerApplyParams = {
              work_type:'',
              num:'',
              startDateStr:'',
              endDateStr:'',
              startTimeStr:'',
              endTimeStr:''
          };
          $scope.work_typeTip = false;  
          $scope.numTip = false;
          $scope.startDateTip = false; 
          $scope.endDateTip = false; 
          $scope.startTimeTip = false; 
          $scope.endTimeTip = false;          
      }






    };



})

.controller('AboutCtrl',function($scope){

})