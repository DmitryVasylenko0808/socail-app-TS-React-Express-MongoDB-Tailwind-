const jwt = require("jsonwebtoken");
const config = require("../config");
const UserModel = require("../models/User");

const isFollower = (req, privateUser) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, config.SECRET_KEY);
        const followers = privateUser.followers.map(f => f.user.toString());

        if (decoded.userId === privateUser._id.toString() || followers.includes(decoded.userId)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const isPrivateUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ login: req.params.login});

        if (!user.is_private || isFollower(req, user)) {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = isPrivateUser;