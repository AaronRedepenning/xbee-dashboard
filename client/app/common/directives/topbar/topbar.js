angular.module('dashboard.common', [])

.directive('dashboardTopbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/topbar/topbar.html'
  }
});
