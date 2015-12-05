/**
 * Created by csvan on 05/12/15.
 */

class ProjectMethods {

    /**
     * Utility method to check if a project exists in the database
     *
     * @param project
     * @returns {*|boolean}
     */
    static exists(project) {
        return project && !!Projects.findOne({_id: project._id});
    }
}
