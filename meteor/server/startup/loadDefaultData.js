Meteor.startup(function () {
    console.log("Project count: " + Projects.find().count());

    Projects.remove({});

    if (Projects.find().count() <= 0) {
        console.log("Creating default value for projects");
        var projects = [
            {
                'name': 'project1',
                'date': '10/10/15',
                'location': 'Goteborg',
                'maxNumberCandidate': 10,
                'numberCandidate': 5,
                'description': 'This project is about doing stuff.',
                geo: {
                    type: 'Point',
                    coordinates: [11.9669514, 57.7089355]
                }
            },
            {
                'name': 'project2',
                'date': '10/10/15',
                'location': 'Paris',
                'maxNumberCandidate': 10,
                'numberCandidate': 5,
                'description': 'This project is about doing more stuff than project1.',
                geo: {
                    type: 'Point',
                    coordinates: [11.9669585, 57.7089301]
                }
            },
            {
                'name': 'project3',
                'date': '10/10/15',
                'location': 'New York',
                'maxNumberCandidate': 10,
                'numberCandidate': 5,
                'description': 'This project is about doing EVEN more stuff.',
                geo: {
                    type: 'Point',
                    coordinates: [11.9666585, 57.7084301]
                }
            }
        ];
        for (var i = 0; i < projects.length; i++) {
            Projects.insert({
                name: projects[i].name,
                date: projects[i].date,
                location: projects[i].location,
                maxNumberCandidate: projects[i].maxNumberCandidate,
                numberCandidate: projects[i].numberCandidate,
                description: projects[i].description
            });
        }
    }
});
