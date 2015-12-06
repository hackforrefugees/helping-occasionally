angular.module('hack4karma').controller('NewProjectCtrl', function ($scope, $meteor) {
    $scope.projects = $meteor.collection(Projects).subscribe('projects');

    $scope.create = function (newProject) {
        if (!newProject)
            return;

        // Create object
        newProject.numberCandidate = 0;
        newProject.owner = $scope.currentUser._id;
        // Save object to db
        $scope.projects.save(newProject);
        // Reset form
        $scope.newProject = '';
    }

});
