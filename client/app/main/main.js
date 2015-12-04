'use strict';

angular.module('dashboard.main', ['ngRoute', 'angular-flot', 'ngSocket'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$interval', '$scope', '$socket', function($interval, $scope, $socket) {
  var ctrl = this;
  this.avgTemp = 0;
  this.avgHum = 0;
  this.light1 = 0;
  this.light2 = 0;

  var pos = 30;
  $scope.dataset = [{ data: [], yaxis: 1, label: 'sin' }];
  $scope.options = {
    series: {
      lines: {
        show: true,
        fill: true
      },
      shadowSize: 0
    },
    yaxis: {
      min: -1,
      max: 1
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

  for (var i = 0; i < pos; i += 0.25) {
    $scope.dataset[0].data.push([i, Math.sin(i)]);
  }

  var intervalHandle = $interval(function() {
    $scope.dataset[0].data.shift();
    pos += 0.25;
    $scope.dataset[0].data.push([pos, Math.sin(pos)]);

  }, 400);

  $scope.$on('destroy', function() {
    intervalHandle.cancel();
  });

}]);
