angular.module('dashboard.node-detail', ['ngRoute', 'dashboard.node-detail.sensor'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes/:nodeId', {
    templateUrl: 'node-detail/node-detail.html',
    controller: 'NodeDetailCtrl'
  });
}])

.controller('NodeDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.nodeId = $routeParams.nodeId;
  this.hardwareImage = 'http://placehold.it/800x350';
  this.hardwareInfo = [['Pin #', 'A0'], ['Sampling Period', '3 seconds'], ['Aaron', 'Redepenning']];
}]);
