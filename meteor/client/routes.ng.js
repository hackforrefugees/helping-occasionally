angular.module("hack4karma").run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('error403');
        }
    });
});

angular.module("hack4karma").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('projects', {
            url: '/projects',
            templateUrl: 'client/projects/views/projects-list.ng.html',
            controller: 'ProjectsListCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'client/organization/view/dashboard.ng.html',
            controller: 'DashboardCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state('newProject', {
            url: '/dashboard/newProject',
            templateUrl: 'client/organization/view/newProject.ng.html',
            controller: 'NewProjectCtrl'
        })
        .state('home', {
            url: '/',
            templateUrl: 'client/home/views/home.ng.html',
            controller: 'ProjectsListCtrl'
        })
        .state('error403', {
            url: '/Error403',
            templateUrl: 'client/errors/views/error403.ng.html',
            controller: 'ProjectsListCtrl'
        });

    $urlRouterProvider.otherwise("/");
});