const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    id: {
        type: String,
    },
    access_token: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = FBUser = mongoose.model('fbuser', UserSchema);