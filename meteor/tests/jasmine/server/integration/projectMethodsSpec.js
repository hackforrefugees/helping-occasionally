/**
 * Created by csvan on 05/12/15.
 */

describe('Project Methods', () => {

    beforeEach(() => {

        // Clear database
        Meteor.users.remove({});
        Projects.remove({});
        ProjectMembers.remove({});
    });

    describe('Exists', () => {

        it('Shows an existing project as existing', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Loving'});

            expect(project).toBeDefined();

            expect(ProjectMethods.exists(project)).toBe(true);
        });

        it('Does not show an non-existing project as existing', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Hating'});

            expect(project).toBeUndefined();

            expect(ProjectMethods.exists(project)).toBe(false);
        });
    });

    describe('AddUser', () => {

        it('Correctly adds a user', () => {

            Projects.insert({name: 'Loving'});
            let project = Projects.findOne({name: 'Loving'});
            expect(project).toBeDefined();

            Accounts.createUser({
                email: 'larry@loving.long',
                password: 'password'
            });

            let user = Meteor.users.findOne({});
            expect(user).toBeDefined();

            ProjectMethods.addUser(project, user);
            let projectMethodMapping = ProjectMembers.findOne({userId: user._id, projectId: project._id});

            expect(projectMethodMapping).toBeDefined();
            expect(projectMethodMapping.userId).toEqual(user._id);
            expect(projectMethodMapping.projectId).toEqual(project._id);
        });
    });

    describe('RemoveUser', () => {

        it('Correctly removes a user from the project', () => {

            Projects.insert({name: 'Loving'});
            let project = Projects.findOne({name: 'Loving'});
            expect(project).toBeDefined();

            Accounts.createUser({
                email: 'larry@loving.long',
                password: 'password'
            });

            let user = Meteor.users.findOne({});
            expect(user).toBeDefined();

            ProjectMethods.addUser(project, user);
            ProjectMethods.removeUser(project, user);

            let projectMethodMapping = ProjectMembers.findOne({userId: user._id, projectId: project._id});
            expect(projectMethodMapping).toBeUndefined();
        });
    });

    describe('SetOwner', () => {

        it('Correctly sets the owner of a project to the selected user', () => {

            Projects.insert({name: 'Loving'});
            let project = Projects.findOne({name: 'Loving'});
            expect(project).toBeDefined();

            Accounts.createUser({
                email: 'larry@loving.long',
                password: 'password'
            });

            let user = Meteor.users.findOne({});
            expect(user).toBeDefined();

            ProjectMethods.setOwner(project, user);
            let updatedProject = Projects.findOne({_id: project._id});
            expect(updatedProject).toBeDefined();
            expect(updatedProject.ownerId).toEqual(user._id);
        });
    });
});
