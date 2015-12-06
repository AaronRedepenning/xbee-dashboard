angular.module('dashboard.sidebar', [])

.controller('SidebarCtrl', [ '$location', '$scope', function($location, $scope) {
  $scope.isActive = function(path) {
    return path === $location.path();
  };
}])

.directive('dashboardSidebar', function() {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/sidebar/sidebar.html',
    controller: 'SidebarCtrl'
  };
});
