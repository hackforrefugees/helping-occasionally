/**
 * Created by csvan on 05/12/15.
 */

ProjectMethods = {

    /**
     * Utility method to check if a project exists in the database
     *
     * @param project
     * @returns {*|boolean}
     */
    exists: (project) => {
        return !!project && !!Projects.findOne({_id: project._id});
    },

    /**
     * Connects a user to a project. Fails silently if the user is already a members of the project.
     *
     * @param project
     * @param user
     */
    addUser: (project, user) => {

        // Verify that the user exists
        let verifiedUser = Meteor.users.findOne({_id: user._id});
        if (!verifiedUser) {
            throw new Error('Invalid user');
        }

        // Verify that the project exists
        if (!ProjectMethods.exists(project)) {
            throw new Error('Project does not exist');
        }

        // Create a new link instance
        return ProjectMembers.insert({projectId: project._id, userId: user._id});
    },

    /**
     * Removes a user from a project. Fails silently if the user is not a member of the project.
     *
     * @param project
     * @param user
     */
    removeUser: (project, user) => {

        // Verify that the user exists
        let verifiedUser = Meteor.users.findOne({_id: user._id});
        if (!verifiedUser) {
            throw new Error('Invalid user');
        }

        // Verify that the project exists
        if (!ProjectMethods.exists(project)) {
            throw new Error('Project does not exist');
        }

        // Remove the link
        return ProjectMembers.remove({projectId: project._id, userId: user._id});
    },

    /**
     * Sets or changes the owner of a project.
     *
     * @param project
     * @param user
     */
    setOwner(project, user) {

        // Verify that the user exists
        let verifiedUser = Meteor.users.findOne({_id: user._id});
        if (!verifiedUser) {
            throw new Error('Invalid user');
        }

        // Verify that the project exists
        if (!ProjectMethods.exists(project)) {
            throw new Error('Project does not exist');
        }

        Projects.update(project._id, {ownerId: user._id});
    },

    /**
     * Returns all projects owner by user.
     *
     * @param user
     */
    getProjectsOwnedBy: (user) => {

        // Verify that the user exists
        let verifiedUser = Meteor.users.findOne({_id: user._id});
        if (!verifiedUser) {
            throw new Error('Invalid user');
        }

        return Projects.find({}, {ownerId: user._id}).fetch();
    },

    /**
     * Creates a user application for a project.
     *
     * @param project
     * @param user
     * @param applicationText
     * @returns {*|any}
     */
    addApplicationForProject: (project, user, applicationText) => {

        // Verify that the user exists
        let verifiedUser = Meteor.users.findOne({_id: user._id});
        if (!verifiedUser) {
            throw new Error('Invalid user');
        }

        // Verify that the project exists
        if (!ProjectMethods.exists(project)) {
            throw new Error('Project does not exist');
        }

        // Verify that we do not already have an active application for this project.
        let existingApplication = ProjectApplications.findOne({projectId: project._id, userId: user._id});
        if (!!existingApplication) {
            throw new Error('This user already has a pending application for this project');
        }

        return ProjectApplications.insert({
            projectId: project._id,
            userId: user._id,
            text: applicationText,
            status: 'pending'
        });
    }
};
