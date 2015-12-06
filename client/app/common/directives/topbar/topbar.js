angular.module('dashboard.topbar', [])

.directive('dashboardTopbar', function() {
  return {
    restrict: 'E',
    scope: {
      collapsed: '='
    },
    templateUrl: 'common/directives/topbar/topbar.html'
  }
});
