angular.module('dashboard.node-detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes/:nodeId', {
    templateUrl: 'node-detail/node-detail.html',
    controller: 'NodeDetailCtrl'
  });
}])

.controller('NodeDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.nodeId = $routeParams.nodeId;
}]);
