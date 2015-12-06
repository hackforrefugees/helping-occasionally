/**
 * Created by csvan on 05/12/15.
 */

function clearDatabase() {
    Meteor.users.remove({});
    Projects.remove({});
    ProjectMembers.remove({});
    ProjectApplications.remove({});
}

describe('Project Methods', () => {

    beforeEach(() => {
        clearDatabase();
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

    describe('GetProjectsOwnedBy', () => {

        it('Correctly returns all projects owned by a user', () => {

            Projects.insert({name: 'Loving'});
            Projects.insert({name: 'Cuddling'});

            let firstProject = Projects.findOne({name: 'Loving'});
            let secondProject = Projects.findOne({name: 'Cuddling'});

            Accounts.createUser({
                email: 'larry@loving.long',
                password: 'password'
            });

            let user = Meteor.users.findOne({});

            ProjectMethods.setOwner(firstProject, user);
            ProjectMethods.setOwner(secondProject, user);

            let projectsForUser = ProjectMethods.getProjectsOwnedBy(user);
            expect(projectsForUser).toBeDefined();
            expect(projectsForUser.length).toEqual(2);
        });
    });

    describe('AddApplicationForProject', () => {

        beforeEach(() => {
            clearDatabase();
        });

        it('Correctly adds a user application for a project', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Loving'});

            Accounts.createUser({
                email: 'anna@applying.now',
                password: 'password'
            });

            let user = Meteor.users.findOne({});

            ProjectMethods.addApplicationForProject(project, user, 'I want to help out!!');
            let userApplication = ProjectApplications.findOne({userId: user._id, projectId: project._id});
            expect(userApplication).toBeDefined();
            expect(userApplication.projectId).toEqual(project._id);
            expect(userApplication.userId).toEqual(user._id);
        });

        it('Does not allow a user to make a duplicate application', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Loving'});

            Accounts.createUser({
                email: 'anna@applying.now',
                password: 'password'
            });

            let user = Meteor.users.findOne({});

            ProjectMethods.addApplicationForProject(project, user, 'I want to help out!!');
            expect(function () {
                ProjectMethods.addApplicationForProject(project, user, 'Applying again just in case')
            }).toThrow(new Error('This user already has a pending application for this project'));
        });
    });

    describe('AddMemberForProject', () => {

        beforeEach(() => {
            clearDatabase();
        });

        it('Correctly adds a user as a member', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Loving'});

            Accounts.createUser({
                email: 'anna@applying.now',
                password: 'password'
            });

            let user = Meteor.users.findOne({});

            ProjectMethods.addMemberForProject(project, user);
            let membership = ProjectMembers.findOne({userId: user._id, projectId: project._id});
            expect(membership).toBeDefined();
            expect(membership.projectId).toEqual(project._id);
            expect(membership.userId).toEqual(user._id);
        });

        it('Does not allow a member to become a member of an application twice', () => {

            Projects.insert({name: 'Loving'});

            let project = Projects.findOne({name: 'Loving'});

            Accounts.createUser({
                email: 'anna@applying.now',
                password: 'password'
            });

            let user = Meteor.users.findOne({});

            ProjectMethods.addMemberForProject(project, user);
            expect(function () {
                ProjectMethods.addMemberForProject(project, user)
            }).toThrow(new Error('This user is already a member of this project'));
        });
    });
})
;
