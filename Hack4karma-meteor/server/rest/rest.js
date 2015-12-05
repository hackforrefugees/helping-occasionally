/**
 * Created by csvan on 05/12/15.
 */

Meteor.startup(() => {
    let Api = new Restivus({
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
    Api.addCollection(Skills);
    Api.addCollection(Causes);
    Api.addCollection(Projects);

    Api.addRoute('custom', {
        get: function () {
            return {
                status: 'success',
                data: 'get something different'
            };
        }
    });
});


