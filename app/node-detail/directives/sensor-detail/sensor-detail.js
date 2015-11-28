angular.module('dashboard.node-detail.sensor', [])

.controller('SensorDetailCtrl', [ function() {
  this.sensorImage = 'https://cdn.sparkfun.com//assets/parts/4/1/8/8/10988-01.jpg';
  this.sensorDescription = 'The TMP36 is a low voltage, precision centigrade temperature sensor.';
  this.equation = '$$x=34 * y$$';
}])

.directive('sensorDetail', function() {
  return {
    restrict: 'E',
    templateUrl: 'node-detail/directives/sensor-detail/sensor-detail.html',
    controller: 'SensorDetailCtrl'
  }
});
