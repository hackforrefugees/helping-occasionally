angular.module('hack4karma').controller('DashboardCtrl', function ($scope, $meteor, $location) {

    $scope.usersProjects = $meteor.collection(Projects).subscribe('projects');

    $scope.selected = [];

    $scope.query = {
        filter: '',
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.openProject = function (project) {
        $location.path("/Project/" + project._id);
    };

    $scope.delete = function(project){
        $scope.usersProjects.splice($scope.usersProjects.indexOf(project), 1);
    };

    // TODO: Fix ordering, sort and pagination. Using https://github.com/daniel-nagy/md-data-table#usage
    /*
     function success(desserts) {
     $scope.desserts = desserts;
     }

     // in the future we may see a few built in alternate headers but in the mean time
     // you can implement your own search header and do something like
     $scope.search = function (predicate) {
     $scope.filter = predicate;
     $scope.deferred =  $scope.allProjects.get($scope.query, success).$promise;
     };

     $scope.onOrderChange = function (order) {
     return $scope.allProjects.get($scope.query, success).$promise;
     };

     $scope.onPaginationChange = function (page, limit) {
     return  $scope.allProjects.get($scope.query, success).$promise;
     };
     */
});
