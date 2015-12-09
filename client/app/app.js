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

.controller('GlobalCtrl', ['$scope', '$socket', '$timeout', function($scope, $socket, $timeout) {
  $scope.sensors = [];
  $scope.averageHum = 0;
  $scope.averageTemp = 0;
  $scope.isCollapsed = true;

  //Each timeout will be tagged with the assosiated XBee's remote16
  var timeouts = {};

  $socket.on('update', function(message) {
    //End watch timout on XBee since we recieved a message from it
    $timeout.cancel(timeouts[message.remote16]);

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
    }
    else {
      //This remote16 wasn't found. New node so add it to array.
      $scope.sensors.push({id:message.remote16, temp: message.temperature, hum: message.humidity});
    }

    //Calculate average temperature and humidity
    $scope.averageTemp = averageTemp();
    $scope.averageHum = averageHum();

    //Start disconnect timer, allow 5 for another message to be recieved,
    //otherwise it will be disconnected
    var timeouts[message.remote16] = $timeout(watchXBee(message.remote16) , 5000);
  });

  var watchXBee = function(id) {
    //Find the XBee by remote16 in sensor array
    var idx = -1;
    for (var i = 0; i < $scope.sensors.length; i++) {
      if($scope.sensors[i].id == id) {
        idx = i;
        break;
      }
    }

    if(idx != -1) {
      //remote16 was found in the array
      //Since there was an xbee timeout, remove the Xbee from array
      $scope.sensors.splice(idx, 1);
    }
  };

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
