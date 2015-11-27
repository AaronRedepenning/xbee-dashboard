angular.module('dashboard.wsn-node', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wsn-node', {
    templateUrl: 'wsn-node/wsn-node.html'
  });
}]);
