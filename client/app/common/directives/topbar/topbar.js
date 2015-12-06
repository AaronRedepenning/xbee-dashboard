angular.module('dashboard.topbar', [])

.directive('dashboardTopbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/topbar/topbar.html'
  }
});
