const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const moveFile = require("../utils/moveFile");

class PostsController {
    static async get(req, res) {
        try {

            res.json({ succes: true, login, token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = PostsController;