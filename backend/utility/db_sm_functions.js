const Profile = require("../models/Profile");

exports.initialiseProfile = (id, name) => {
    const newProfile = new Profile({
        user: id,
        userName: name
    })
    newProfile.save((err, profile) => {
        if (err) return false
        return true
    })
}