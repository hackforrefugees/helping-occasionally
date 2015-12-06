angular.module('hack4karma').controller('DashboardApplicationsCtrl', function ($scope, $meteor, $location) {

    // Todo: Replace to access live data
    $scope.pendingApplications = [
        {
            project: "Project1",
            user: {
                name: "Patrick",
                points: 10
            },
            status: "pending",
            text: "my awesome applicion letter."
        }];
    $scope.answeredApplications = [
        {
            project: "Project1",
            user: {
                name: "Patrick",
                points: 10
            },
            status: "refused",
            text: "my awesome applicion letter."
        },
        {
            project: "Project1",
            user: {
                name: "Patrick",
                points: 10
            },
            status: "accepted",
            text: "my awesome applicion letter."
        }
    ]
    $scope.answerApplication = function(application, state)
    {
        // Change the status depending of state
        // todo: clean log outputs
        switch (state)
        {
            case true:
                console.log("Set to accepted");
                application.status = "accepted";
                break;
            case false:
                console.log("Set to refused");
                application.status = "declined";
                break;
            default:
                console.log("Something went wrong in answerApplication(application, state).");
                break;
        }
        return;
    }
});
