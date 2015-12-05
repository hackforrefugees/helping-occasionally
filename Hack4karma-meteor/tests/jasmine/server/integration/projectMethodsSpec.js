/**
 * Created by csvan on 05/12/15.
 */

describe('Project Methods', () => {

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
});
