angular.module('hack4karma').controller('ProjectsListCtrl', function ($scope, $meteor) {
    $scope.allProjects = $meteor.collection(Projects).subscribe('projects');

    $scope.remove = function (project) {
        $scope.allProjects.splice($scope.allProjects.indexOf(project), 1);
    };
});

