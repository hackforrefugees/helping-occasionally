Meteor.startup(function () {
    console.log("Project count: " + Projects.find().count());

    Meteor.users.remove({});
    Projects.remove({});

    // Insert mock user
    let userId = Accounts.createUser({
        email: 'admin@admin.com',
        password: 'password',
        profile: {accountType:'organizer'}
    });
    Accounts.createUser({
        email: 'test@test.com',
        password: 'password',
        profile: {accountType:'volunteer'}
    });

    var projects = [
        {
            'name': 'project1',
            'date': '10/10/15',
            'ownerId': userId,
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
            'ownerId': userId,
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
            'ownerId': 777,
            'location': 'New York',
            'maxNumberCandidate': 10,
            'numberCandidate': 5,
            'description': 'This project is about doing EVEN more stuff.',
            geo: {
                type: 'Point',
                coordinates: [11.9666585, 57.7084301]
            }
        },
        {
            'name': 'project4',
            'date': '10/10/15',
            'ownerId': 810,
            'location': 'New York',
            'maxNumberCandidate': 10,
            'numberCandidate': 5,
            'description': 'This project is about doing EVEN more stuff.',
            geo: {
                type: 'Point',
                coordinates: [11.9666185, 57.7082301]
            }
        },
        {
            'name': 'project5',
            'date': '10/10/15',
            'ownerId': 790,
            'location': 'New York',
            'maxNumberCandidate': 10,
            'numberCandidate': 5,
            'description': 'This project is about doing EVEN more stuff.',
            geo: {
                type: 'Point',
                coordinates: [11.9666985, 57.7081301]
            }
        },
        {
            'name': 'project6',
            'date': '10/10/15',
            'ownerId': 780,
            'location': 'New FYork',
            'maxNumberCandidate': 10,
            'numberCandidate': 5,
            'description': 'This project is about doing EVEN more stuff.',
            geo: {
                type: 'Point',
                coordinates: [11.9663585, 57.7084101]
            }
        }
    ];

    projects.forEach(project => Projects.insert(project))
});
