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
        }
    ];

    projects.forEach(project => Projects.insert(project))
});
