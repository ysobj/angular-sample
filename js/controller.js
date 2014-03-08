var lifeplanApp = angular.module('lifeplanApp', []);

lifeplanApp.controller('lifeplanCtrl', function($scope){
    /* initial value */
    $scope.ageAtStart = 22;
    $scope.asset = 10000000;
    $scope.depositPerYear = 1000000;
    $scope.interestRate = 101;
    // statistics
    var retirement = 60;
    // school expenses
    var publicSchool = [
      0, 0, 0,
      190000, 210000, 260000,
      310000, 250000, 270000, 300000, 310000, 390000,
      450000, 400000, 500000,
      440000, 400000, 330000
    ];
    var privateSchool = [
      0, 0, 0,
      480000, 450000, 530000,
     1700000, 1200000, 1250000, 1400000, 1450000, 1550000,
     1560000, 1120000, 1200000,
     1160000, 850000, 880000
    ];
    var schoolExpenses = [publicSchool, privateSchool];

    // logic
    $scope.refresh = function(){
      $scope.datas = [];
      var totalDeposit = parseInt($scope.asset, 10);
      var age = parseInt($scope.ageAtStart, 10);
      var remmaining = retirement - age;
      var end = 2014 + remmaining;
      var i;
      for(i = 2014; i <= end; i++){
        $scope.datas.push(
          {
            'year' : i,
            'age' : age,
            'deposit' : totalDeposit,
            'childAge' : i - 2014,
            'schoolExpenses' : schoolExpenses[0][i - 2014]
          });
        totalDeposit = (totalDeposit * parseInt($scope.interestRate, 10)) / 100  + parseInt($scope.depositPerYear, 10);
        age++;
      }
    };
    $scope.append = function(){
      var maxYear = 0;
      angular.forEach($scope.datas, function(value){
        if(maxYear < value.year){
          maxYear = value.year;
        }
      });
      $scope.datas.push(
        {
          'year' : maxYear+1,
          'deposit' : $scope.depositPerYear
        });
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
