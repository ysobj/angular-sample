var lifeplanApp = angular.module('lifeplanApp', []);

lifeplanApp.controller('lifeplanCtrl', function($scope){
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
          'deposit' : Math.floor( Math.random() * 300 )
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
