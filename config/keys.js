module.exports = {
    mongoURI: "mongodb://localhost/knowing",
    secretOrKey: 'blank',
    fb: {
        clientID: "668310833674969",
        clientSecret: "c23118883a23318fd14394a2428cc5d5",
        callbackURL: "//localhost:3000/api/users/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
    }
};