angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ApplyCtrl',function($scope,$ionicModal){

	$scope.ApplyParams = {
		name:'',
		address:'',
		phone:'',
		vercode:'',
		applys:[],

	};

	$scope.PerApplyParams = {};

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


  	$scope.options = {
    	defaultDate: new Date(),
    	minDate: "2015-01-01",
    	maxDate: "2016-12-31",
    	dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    	mondayIsFirstDay: true,//set monday as first day of week. Default is false

    	dateClick: function(date) {
    		console.log(date);
        	$scope.datePickerModal.hide()      
    	},
    	changeMonth: function(month, year) {
        
    	},
  	};


})

.controller('AboutCtrl',function($scope){

})