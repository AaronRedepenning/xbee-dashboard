angular.module('dashboard.weather', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/weather', {
    templateUrl: 'weather/weather.html'
  });
}]);
