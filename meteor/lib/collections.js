/**
 * Created by csvan on 05/12/15.
 */

/**
 * Core User model, aliased for convenience.
 *
 * @type {any}
 */
Users = Meteor.users;

/**
 * Projects, which represent tasks needed by Organisations which need to be done by Volunteers.
 *
 * @type {Mongo.Collection}
 */
Projects = new Mongo.Collection('projects');

// Permissions
Projects.allow({
    insert: function (userId, project) {
        return userId && project.owner === userId;
    },
    update: function (userId, project, fields, modifier) {
        return userId && project.owner === userId;
    },
    remove: function (userId, project) {
        return userId && project.owner === userId;
    }
});

/**
 * An application for a Project made by a User.
 *
 * @type {collectionFn}
 */
ProjectApplications = new Mongo.Collection('projectApplication');

/**
 * M2M mapping between Projects and their User members.
 *
 * @type {Mongo.Collection}
 */
ProjectMembers = new Mongo.Collection('projectMembers');

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
