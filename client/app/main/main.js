'use strict';

angular.module('dashboard.main', ['ngRoute', 'angular-flot', 'ngSocket'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$interval', '$scope', '$socket', function($interval, $scope, $socket) {
  var ctrl = this,
      dataMax = 30;

  $scope.tempDataset = [{ data: [], yaxis: 1, label: 'Temperature' }];
  $scope.humDataset = [{ data: [], yaxis: 1, label: 'Humidity' }];
  $scope.options = {
    series: {
      lines: {
        show: true,
        fill: true
      },
      shadowSize: 0
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    },
    grid: {
      hoverable: true,
      borderWidth: 1,
      borderColor: '#eeeeee'
    },
    colors: ["#5BA0D3"]
  };

  // // Watch Temperature Value from Socket.io
  // $scope.$watch('averageTemp', function(newValue, oldValue) {
  //   console.log("Temperature Changed");
  //   if($scope.tempDataset[0].data.length == dataMax) {
  //     $scope.tempDataset[0].data.shift();
  //   }
  //   $scope.tempDataset[0].data.push(newValue);
  // });
  //
  // // Watch Humidity Value from Socket.io
  // $scope.$watch('averageHum', function(newValue, oldValue) {
  //   console.log("Humidity Changed");
  //   if($scope.humDataset[0].data.length == dataMax) {
  //     $scope.humDataset[0].data.shift();
  //   }
  //   $scope.humDataset[0].data.push(newValue);
  // });

  // Fill datasets with random data
  for (var i = 0; i < dataMax; i++) {
    $scope.tempDataset[0].data.push([i, $scope.averageTemp]);
    $scope.humDataset[0].data.push([i, $scope.averageTemp]);
  }

  var intervalHandle = $interval(function() {
    dataMax++;
    //Get rid of old data points
    $scope.tempDataset[0].data.shift();
    $scope.humDataset[0].data.shift();

    //Add new data point
    $scope.tempDataset[0].data.push([dataMax, $scope.averageTemp]);
    $scope.humDataset[0].data.push([dataMax, $scope.averageHum])
  }, 400);

  $scope.$on('destroy', function() {
    intervalHandle.cancel();
  });

}]);
