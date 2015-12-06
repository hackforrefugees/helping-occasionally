angular.module('hack4karma').controller('allProjectsCtrl', function ($scope, $meteor) {
    $scope.projects = $meteor.collection(Projects).subscribe('projects');
});
