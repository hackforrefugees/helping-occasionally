angular.module("hack4karma").run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        switch(error) {
            case "AUTH_REQUIRED":
                $state.go('error403');
                break;
            case "UNAUTHORIZED":
                $state.go('error403');
                break;
            default:
                break;
        }
    });
});

angular.module("hack4karma").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('allProjects', {
            url: '/allProjects',
            templateUrl: 'client/allProjects/views/allProjects.ng.html',
            controller: 'allProjectsCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'client/organization/view/dashboard.ng.html',
            controller: 'DashboardCtrl',
            resolve: {
                // todo: check if user is an organizer
                "currentUser": function ($meteor) {
                    if($scope.currentUser.profile.accountType !== "organizer")
                    {
                        return 'UNAUTHORIZED';
                    }
                    return $meteor.requireUser();
                }
            }
        })
        .state('newProject', {
            url: '/dashboard/newProject',
            templateUrl: 'client/organization/view/newProject.ng.html',
            controller: 'NewProjectCtrl',
            resolve: {
                // todo: check if user is an organizer
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state('dashboard-applications', {
            url: '/dashboard/applications',
            templateUrl: 'client/organization/view/dashboard-applications.ng.html',
            controller: 'DashboardApplicationsCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    // todo: check if user is an organizer
                    return $meteor.requireUser();
                }
            }
        })
        .state('home', {
            url: '/',
            templateUrl: 'client/home/views/home.ng.html',
            controller: 'AppCtrl'
        })
        .state('about', {
            url: '/About',
            templateUrl: 'client/about/views/about.ng.html',
            controller: 'AboutCtrl'
        })
        .state('error403', {
            url: '/Error403',
            templateUrl: 'client/errors/views/error403.ng.html',
            controller: 'ProjectsListCtrl'
        });

    $urlRouterProvider.otherwise("/");
});