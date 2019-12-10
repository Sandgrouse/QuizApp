// Load user model
const User = require("../models/Users");


module.exports  = function getUserFromParams(id, res) {
    

    User.findById(id).then((user) => {
        res.status(200).json({
            id: user.id,
            name: user.fullName,
            email: user.email,
            badges: user.badges,
            courses: user.courses,
            experiencePoints: user.experiencePoints,
            avatar: user.avatar
        });

    });


}
