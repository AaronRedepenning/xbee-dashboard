'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboard', [
  'ngRoute',         // Anguler Module used for view routing
  'dashboard.main',  // For module code see: .js files in /main
  'dashboard.common', // For module code see: .js files in /common
  'dashboard.node-detail',
  'dashboard.charting'
])

.config(['$routeProvider', function($routeProvider) {
  // Set default route to be /main
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
