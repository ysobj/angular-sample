var lifeplanApp = angular.module('lifeplanApp', []);

lifeplanApp.controller('lifeplanCtrl', function($scope){
  /* initial value */
  $scope.year = 2000;
  $scope.ageAtStart = 22;
  $scope.asset = 10000000;
  $scope.depositPerYear = 1000000;
  $scope.interestRate = 101;
  $scope.birthYear = 2006;
  $scope.kindergarten = 0;
  $scope.primarySchool = 0;
  $scope.juniorHighSchool = 0;
  $scope.highSchool = 1;
  $scope.university = 1;
  $scope.pension = 786500;
  $scope.livingCost = 297070 * 12;
  $scope.pensionStart = 65;
  $scope.retirementAge= 60;

  $scope.childSettings = [{},{}];
  // statistics
  var lifeSpan = 80;
  // school expenses
  var publicSchool = [
    0, 0, 0, 0,
    190000, 210000, 260000,
    310000, 250000, 270000, 300000, 310000, 390000,
    450000, 400000, 500000,
    440000, 400000, 330000
      ];
  var privateSchool = [
    0, 0, 0, 0,
    480000, 450000, 530000,
    1700000, 1200000, 1250000, 1400000, 1450000, 1550000,
    1560000, 1120000, 1200000,
    1160000, 850000, 880000
      ];
  var schoolExpenses = [publicSchool, privateSchool];

  var schoolYear = [ null, null, null, null,
      'kindergarten', 'kindergarten', 'kindergarten',
      'primarySchool','primarySchool','primarySchool','primarySchool','primarySchool','primarySchool',
      'juniorHighSchool','juniorHighSchool','juniorHighSchool',
      'highSchool','highSchool','highSchool',
      'university','university','university','university'];

  var normalizeAge = function(age){
    if(age < 0){
      return null;
    }
    return age;
  };
  var normalizeNum = function(num){
    if(num != null){
      return num;
    }
    return 0;
  };
  // logic
  $scope.refresh = function(){
    console.log($scope);
    $scope.datas = [];
    var currentYear = parseInt($scope.year,10);
    var totalDeposit = parseInt($scope.asset, 10);
    var age = parseInt($scope.ageAtStart, 10);
    var remaining = lifeSpan - age;
    var end = currentYear + remaining;
    var birthYear = parseInt($scope.birthYear, 10);
    var i;
    for(i = currentYear; i <= end; i++){
      var tmp = 
      {
        'year' : i,
        'age' : age,
        'deposit' : Math.round(totalDeposit),
        'children' : []
      };
      var child = {};
      child.birthYear = birthYear;
      $scope.processChild(tmp,{ 'birthYear': birthYear }, child);
      tmp.children.push(child);

      $scope.datas.push(tmp);
      if(age <= parseInt($scope.retirementAge,10)){
        totalDeposit = (totalDeposit * parseInt($scope.interestRate, 10)) / 100  + parseInt($scope.depositPerYear, 10);
      }else{
        totalDeposit = (totalDeposit * parseInt($scope.interestRate, 10)) / 100  - parseInt($scope.livingCost, 10);
      }
      angular.forEach(tmp.children, function(child){
        totalDeposit = totalDeposit - normalizeNum(child.schoolExpenses);
      });
      if(age >= parseInt($scope.pensionStart,10)){
        totalDeposit += parseInt($scope.pension,10);
      }
      age++;
    }
    $scope.processGraph();
  };
  $scope.processGraph = function(){
    $('#myfirstchart').empty();
    var arr = [];
    angular.forEach($scope.datas,function(tmp){
      var obj = {};
      obj.year = String(tmp.year);
      obj.deposit = tmp.deposit;
      arr.push(obj);
    });
    $scope.graph = new Morris.Line({
      // ID of the element in which to draw the chart.
      element: 'myfirstchart',
      // Chart data records -- each entry in this array corresponds to a point on
      // the chart.
      data: 
      arr,
      // The name of the data record attribute that contains x-values.
      xkey: 'year',
      // A list of names of data record attributes that contain y-values.
      ykeys: ['deposit'],
      // Labels for the ykeys -- will be displayed when you hover over the
      // chart.
      labels: ['Value']
    });
  };
  $scope.processChild = function(context, childSetting, child){
    var childAge = normalizeAge(context.year - childSetting.birthYear);
    var schoolType = 0;
    if(childAge || childAge === 0){
      child.childAge = childAge;
      child.childSchool = schoolYear[childAge];
      schoolType = $scope[child.childSchool];
      if(schoolType != null){
        child.schoolExpenses = schoolExpenses[schoolType][childAge];
      }
    }
  };
  $scope.datas = [
  {
    'year' : 2013,
      'deposit' : 130
  },
  {
    'year' : 2014,
    'deposit' : 100
  },
  {
    'year' : 2015,
    'deposit' : 120
  }
  ];
});
