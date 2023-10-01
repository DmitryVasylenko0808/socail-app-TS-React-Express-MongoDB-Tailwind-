const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const moveFile = require("../utils/moveFile");

class AuthController {
    static async signUp(req, res) {
        try {
            const { password } = req.body;
            const hash = await bcrypt.hash(password, 5);

            let UAvatarFileName = null;
            if (req.files !== null && req.files.avatar_file !== null) {
                UAvatarFileName = await moveFile(req.files.avatar_file, "../server/public/avatars");
            }

            const doc = new UserModel({
                login: req.body.login,
                password_hash: hash,
                name: req.body.name,
                location: {
                    country: req.body.country ?? null,
                    city: req.body.city ?? null
                },
                about: req.body.about ?? null,
                avatar_file: UAvatarFileName,
                saved_posts: [],
                followers: [],
                followings: [],
                black_list: []
            });
            await doc.save();

            return res.status(201).json({ succes: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async signIn(req, res) {
        try {
            const { login } = req.body;

            console.log(req.userId, req.userLogin);

            const token = jwt.sign(
                {
                    userId: req.userId,
                    userLogin: req.userLogin
                },
                config.SECRET_KEY,
                {
                    expiresIn: "24h"
                }
            );

            res.json({ succes: true, login, token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = AuthController;