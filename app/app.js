'use strict';

// Declare app level module which depends on modules and components
angular.module('dashboard', ['ngRoute', 'dashboard.main'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
