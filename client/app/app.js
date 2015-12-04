'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboard', [
  'ngRoute',         // Anguler Module used for view routing
  'dashboard.main',  // For module code see: .js files in /main
  'dashboard.common', // For module code see: .js files in /common
  'dashboard.node-detail',
  'ngSocket'
])

.config(['$routeProvider', function($routeProvider) {
  // Set default route to be /main
  $routeProvider.otherwise({redirectTo: '/main'});
}])

.controller('GlobalCtrl', ['$scope', '$socket', function($scope, $socket) {
  $scope.averageTemp = 0;
  $scope.averageHum = 0;

  $socket.on('update', function(message) {
    console.log(message.data);
    if(message.remote16 == 'fe78') {
      $scope.averageTemp = message.temperature;
      $scope.averageHum = message.humidity;
    }
  });
}]);

/* XBee Station Type#2 Frame Example
{ type: 144,
  remote64: '0013a20040e5f261',
  remote16: 'fe78',
  receiveOptions: 1,
  data: <Buffer 49 2d 03 30> }
*/
