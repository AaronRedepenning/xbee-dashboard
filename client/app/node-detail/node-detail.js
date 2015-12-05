angular.module('dashboard.node-detail', ['ngRoute', 'dashboard.node-detail.sensor'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes/:nodeId', {
    templateUrl: 'node-detail/node-detail.html',
    controller: 'NodeDetailCtrl'
  });
}])

.controller('NodeDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  var ctrl = this;
  this.nodeId = $routeParams.nodeId;
  this.hardwareImage = '';
  this.hardwareInfo = [];
  this.xbSettings = [];
  this.sensors = [];

  $http.get('/nodes/' + this.nodeId + '.json')
  .then(function(response) {
    console.log(response);
    ctrl.hardwareImage = response.data.diagramImage;
    ctrl.hardwareInfo = response.data.info;
    ctrl.xbSettings = response.data.xbeeSettings;
    ctrl.sensors = response.data.sensors;
  });

}]);
