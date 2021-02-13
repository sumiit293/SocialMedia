const passport = require("passport");
const router = require("express").Router()

router.get("/test", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await Profile.findOne({ user: req.user.id });
        return res.json({ name: user.name, profilePic: user.profilePic, id: user._id, email: user.email });

    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Something went wrong" });
    }
})

module.exports = router