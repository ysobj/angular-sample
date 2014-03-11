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
  // statistics
  var retirement = 60;
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
// logic
$scope.refresh = function(){
  $scope.datas = [];
  var currentYear = parseInt($scope.year,10);
  var totalDeposit = parseInt($scope.asset, 10);
  var age = parseInt($scope.ageAtStart, 10);
  var remaining = retirement - age;
  var end = currentYear + remaining;
  var birthYear = parseInt($scope.birthYear, 10);
  var i;
  for(i = currentYear; i <= end; i++){
    var tmp = 
    {
      'year' : i,
      'age' : age,
      'deposit' : Math.round(totalDeposit)
    };
    var childAge = normalizeAge(i - birthYear);
    var schoolType = 0;
    if(childAge || childAge === 0){
      tmp.childAge = childAge;
      tmp.childSchool = schoolYear[childAge];
      schoolType = $scope[tmp.childSchool];
      if(schoolType != null){
          tmp.schoolExpenses = schoolExpenses[schoolType][i - birthYear];
      }
    }
    $scope.datas.push(tmp);
    totalDeposit = (totalDeposit * parseInt($scope.interestRate, 10)) / 100  + parseInt($scope.depositPerYear, 10);
    age++;
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
