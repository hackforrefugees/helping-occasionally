/**
 * Created by csvan on 05/12/15.
 */

describe('Project Methods', () => {
    it('Shows an existing project as existing', () => {

        Projects.insert({name: 'Loving'});

        Skills.findOne({});

        let project = Projects.findOne({name: 'Loving'});

        expect(project).toBeDefined();

        expect(ProjectMethods.exists(project)).to.be(true);
    });
});
