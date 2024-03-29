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
      dataMax = 30,
      xCount = 0;

  //Datasets format: { data: [], yaxis: 1, label: 'Temperature' }
  $scope.tempDatasets = [];
  $scope.humDatasets = [];

  //Flot Chart Settings
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
    colors: ["#5BA0D3", "#FF0033"]
  };

  $scope.$on('xbeeDisconnected', function(e, args) {
    console.log('Broadcast from ' + e.name + ' event, for XBee with remote16 = ' + args.id);
    removeFromDataset($scope.tempDatasets, args.id);
    removeFromDataset($scope.humDatasets, args.id);
  });

  var removeFromDataset = function(datasets, xbeeId) {
    //Search dataset for xbeeId
    var idx = -1;
    for (var i = 0; i < datasets.length; i++) {
      if(datasets[i].label == xbeeId) {
        idx = i;
        break;
      }
    }
    //Check if xbeeId was found
    if(idx != -1) {
      //Remove the dataset for this Xbee
      datasets.splice(idx, 1);
    }
  };

  //Interval -> 1sec
  var intervalHandle = $interval(function() {
    xCount++;
    //Remove oldest values to get graph shifting effect
    $scope.tempDatasets.forEach(shiftPlot);
    $scope.humDatasets.forEach(shiftPlot);

    $scope.sensors.forEach(function(sensor, index, array) {
      //Does this sensor already exist on Graph, if so just append data.
      //Otherwise create a new dataset for the sensor
      appendPlot($scope.tempDatasets, sensor, xCount, sensor.temp);
      appendPlot($scope.humDatasets, sensor, xCount, sensor.hum);
    });
    //console.log($scope.tempDatasets);
  }, 1000);

  //Function
  var appendPlot = function(datasets, sensor, xValue, yValue) {
    var idx = -1;
    for (var i = 0; i < datasets.length; i++) {
      if(datasets[i].label == sensor.id) {
        idx = i;
        break;
      }
    }

    if(idx != -1) { //The remote16 was found
      datasets[idx].data.push([xValue, yValue]);
    }
    else { //The remote16 wasn't found
      datasets.push({ data: [xValue, yValue], yaxis: 1, label: sensor.id });
      //console.log("Add new: " + sensor.id);
    }
  };

  //Function
  var shiftPlot = function(element, index, array) {
    if(element.data.length >= dataMax) {
      element.data.shift();
    }
  };

  //Clean Up
  $scope.$on('destroy', function() {
    $interval.cancel(intervalHandle);
  });

}]);
