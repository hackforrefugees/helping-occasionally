angular.module('hack4karma').controller('ProjectListCtrl', function ($scope, $meteor, $location) {
    $scope.projects = $meteor.collection(Projects).subscribe('my-projects');
});
