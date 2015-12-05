angular.module('dashboard.node-detail.sensor', [])

.directive('sensorDetail', function() {
  return {
    restrict: 'E',
    scope: {
      sensorData: '=data'
    },
    templateUrl: 'node-detail/directives/sensor-detail/sensor-detail.html',
  }
});
