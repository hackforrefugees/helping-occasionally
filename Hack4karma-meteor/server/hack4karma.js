/**
 * Created by ubuntu on 2015-12-05.
 */
Projects = new Mongo.Collection('projects');

// Methods execute on the server after being triggered from the client
Meteor.methods({
    'insertProject': function(ProjectVar){

        // Get the ID of the current user
        var currentUserId = Meteor.userId();

    }
});