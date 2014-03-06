var lifeplanApp = angular.module('lifeplanApp', []);

lifeplanApp.controller('lifeplanCtrl', function($scope){
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
