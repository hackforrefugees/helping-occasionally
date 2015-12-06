#What is left to do?

Well, a whole lot! We do love this idea and believe it will be incredibly useful especially in Sweden, so we very much wish to see it go forward. 

Some of the features remaining for an MVP are:

### Possible rewrite
Unfortunately, we made the decision to do this MVP in a framework none of us had any experience in (hey, it was fun!).
This lead to a lot of time lost on research, and even more on fixing incorrect implementation details. Our experience 
tells us that there perhaps are better tools for taking this project where we envision it to be. We do believe that it 
may be better to go for a more decoupled solution, for example using Loopback as a REST backend, and then simply build 
clients for it.

### A complete login system

The basics are there, but we would like two separate user types: Volunteers and Organisations. Organisations should be
able to create and manage projects, and Volunteers should be able to apply for them.

### Profile screen for Volunteers
Here, volunteers should be able to edit their public personal details. They should also be able to review which projects
they have currently signed up for or have been accepted for. A calendar view for upcoming events would be cool too.

### Profile screen for Organisations
Organisations should be able to view and change their own profile, as well as review the projects they have announced,
as well as the Volunteers which have applied for them.

### Trust system
Volunteers should be able to earn "trust points" for the projects they are verified to have taken part in. This will
help Organisations better evaluate applications for more sensitive projects.

### Skills and Causes system
Volunteers and projects should be matched primarily based on Skills (skills which the Volunteer provides) as well as
Causes (specific topics a project covers, such as Women's Right, Child Health etc). There should be an sophisticated
way to quickly suggest good matches between Volunteers and projects based on this, in addition the Volunteers simply
searching for projects.

### Notifications and requests
If the Volunteer enables it, it should be possible for the system to push notifications about upcoming projects that
he or she may be interested in.

### Applying for projects
We are still missing a system for handling both the creation and handling of applications for projects.

### Emergency projects
I could be useful to let Organisations announce "emergency events", for example a scramble to help a group of refugees
whose accomodation has suffered some kind damage in the middle of heavy weather conditions. In this case, all volunteers
in the vicinity would get a notification via mail/push/sms, allowing them to respond.
