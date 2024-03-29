'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboard', [
  'ngRoute',           // Anguler Module used for view routing
  'dashboard.main',    // For module code see: .js files in /main
  'dashboard.sidebar', // For module code see: .js files in /common
  'dashboard.topbar',
  'dashboard.node-detail',
  'dashboard.weather',
  'ngSocket'
])

.config(['$routeProvider', function($routeProvider) {
  // Set default route to be /main
  $routeProvider.otherwise({redirectTo: '/main'});
}])

.controller('GlobalCtrl', ['$scope', '$socket', function($scope, $socket) {
  $scope.sensors = [];
  $scope.averageHum = 0;
  $scope.averageTemp = 0;
  $scope.isCollapsed = true;

  $socket.on('disconnect', function(message) {
    //An XBee has been disconnected, message contains the XBees remote16
    console.log('XBee ' + message + " has been disconnected");

    //Find the XBee that needs to be removed
    var idx = -1;
    for (var i = 0; i < $scope.sensors.length; i++) {
      if($scope.sensors[i].id == message) {
        idx = i;
        break;
      }
    }
    //Remove the object from array
    $scope.sensors.splice(idx, 1);

    //Calculate average temperature and humidity
    $scope.averageTemp = averageTemp();
    $scope.averageHum = averageHum();

    $scope.$broadcast('xbeeDisconnected', {id: message});
  });

  $socket.on('update', function(message) {
    //Find if sensor remote16 is already in the $scope.sensor
    var idx = -1;
    for (var i = 0; i < $scope.sensors.length; i++) {
      if($scope.sensors[i].id == message.remote16) {
        idx = i;
        break;
      }
    }

    if(idx != -1) {
      //This remote16 was found. Update the temp and hum values for it.
      $scope.sensors[idx].temp = message.temperature;
      $scope.sensors[idx].hum = message.humidity;
      $scope.sensors[idx].raw = message;
    }
    else {
      //This remote16 wasn't found. New node so add it to array.
      $scope.sensors.push({id:message.remote16, temp: message.temperature, hum: message.humidity, raw: message});
    }

    //Calculate average temperature and humidity
    $scope.averageTemp = averageTemp();
    $scope.averageHum = averageHum();
  });

  var averageTemp = function() {
    var avg = 0;
    $scope.sensors.forEach(function(element, index, array) {
      avg += element.temp;
    });
    return avg == 0 ? 0 : avg/$scope.sensors.length;
  };

  var averageHum = function() {
    var avg = 0;
    $scope.sensors.forEach(function(element, index, array) {
      avg += element.hum;
    });
    return avg == 0 ? 0 : avg/$scope.sensors.length;
  };

}]);

/* XBee Station Type#2 Frame Example
{ type: 144,
  remote64: '0013a20040e5f261',
  remote16: 'fe78',
  receiveOptions: 1,
  data: <Buffer 49 2d 03 30> }
*/
