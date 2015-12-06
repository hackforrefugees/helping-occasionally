angular.module('hack4karma').controller('ProjectsListCtrl', function ($scope, $meteor) {
    $scope.projects = $meteor.collection(Projects).subscribe('projects');

    $scope.remove = function (project) {
        $scope.projects.splice($scope.projects.indexOf(project), 1);
    };
});

