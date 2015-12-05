/**
 * Created by csvan on 05/12/15.
 */

var Rest = new Restivus({
    apiPath: 'api/',
    auth: {
        token: 'auth.apiKey',
        user: function () {
            return {
                userId: this.request.headers['user-id'],
                token: this.request.headers['login-token']
            };
        }
    },
    defaultHeaders: {
        'Content-Type': 'application/json'
    },
    onLoggedIn: function () {
        console.log(this.user.username + ' (' + this.userId + ') logged in');
    },
    onLoggedOut: function () {
        console.log(this.user.username + ' (' + this.userId + ') logged out');
    },
    prettyJson: true,
    useDefaultAuth: true,
    version: 'v1'
});

// Add core models
Rest.addCollection(Skills);
Rest.addCollection(Causes);
Rest.addCollection(Projects);
