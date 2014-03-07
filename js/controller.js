var lifeplanApp = angular.module('lifeplanApp', []);

lifeplanApp.controller('lifeplanCtrl', function($scope){
    $scope.ageAtStart = 22;
    $scope.depositPerYear = 1000000;
    $scope.interestRate = 101;
    $scope.refresh = function(){
      $scope.datas = [];
      var totalDeposit = parseInt($scope.asset, 10);
      var age = parseInt($scope.ageAtStart, 10);
      var remmaining = 60 - age;
      var end = 2014 + remmaining;
      for(var i = 2014; i <= end; i++){
        $scope.datas.push(
          {
            'year' : i,
            'age' : age,
            'deposit' : totalDeposit
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
