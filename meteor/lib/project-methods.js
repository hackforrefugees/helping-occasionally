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
    }
};
