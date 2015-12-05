/**
 * Created by ubuntu on 2015-12-05.
 */

/**
 * Projects, which represent tasks needed by Organisations which need to be done by Volunteers.
 *
 * @type {Mongo.Collection}
 */
Projects = new Mongo.Collection('projects');

/**
 * Skills which a Volunteer may possess.
 *
 * @type {Mongo.Collection}
 */
Skills = new Mongo.Collection('skills');

/**
 * M2M mapping between Volunteers and their Skills.
 *
 * @type {Mongo.Collection}
 */
VolunteerSkills = new Mongo.Collection('volunteerSkills');

/**
 * Causes, which a Project is focused at (education, healthcare etc).
 *
 * @type {Mongo.Collection}
 */
Causes = new Mongo.Collection('causes');

/**
 * M2M mapping between Projects and Causes.
 *
 * @type {Mongo.Collection}
 */
ProjectCauses = new Mongo.Collection('projectCauses');

Meteor.methods({
    'insertProject': function (ProjectVar) {

        // Get the ID of the current user
        var currentUserId = Meteor.userId();
    }
});
