angular.module('hack4karma').controller('DashboardApplicationsCtrl', function ($scope, $meteor, $location) {
    $scope.projects = $meteor.collection(Projects).subscribe('projects');
});
