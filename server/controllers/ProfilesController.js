const UserModel = require("../models/User");
const moveFile = require("../utils/moveFile");

class ProfilesController {
    static async get(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.params.login });
            if (!user) {
                return res.status(404).json({ succes: false, message: "User is not found" });
            }

            let { password_hash, saved_posts, followers, followings, ...userData } = user._doc;
            followers = followers.map(f => f.user);
            followings = followings.map(f => f.user);

            res.json({ ...userData, followers, followings });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async edit(req, res) {
        try {
            let UAvatarFileName = null;
            if (req.files !== null && req.files.avatar_file !== null) {
                UAvatarFileName = await moveFile(req.files.avatar_file, "../server/public/avatars");
            }

            if (req.files && req.files.avatar_file) {
                await UserModel.updateOne(
                    {
                        _id: req.userId
                    },
                    {
                        name: req.body.name,
                        location: {
                            country: req.body.country ?? null,
                            city: req.body.city ?? null
                        },
                        about: req.body.about ?? null,
                        avatar_file: UAvatarFileName
                    }
                );
            } else {
                await UserModel.updateOne(
                    {
                        _id: req.userId
                    },
                    {
                        name: req.body.name,
                        location: {
                            country: req.body.country ?? null,
                            city: req.body.city ?? null
                        },
                        about: req.body.about ?? null
                    }
                );
            }

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async togglePrivate(req, res) {
        try {
            await UserModel.updateOne(
                {
                    _id: req.userId
                },
                {
                    is_private: !!req.body.isPrivate
                }
            );

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async delete(req, res) {
        try {
            await UserModel.deleteOne({ _id: req.userId });

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getFollowers(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.params.login })
                .populate("followers.user", "login name avatar_file");

            let { followers } = user._doc;
            followers = followers.map(f => ({ ...f.user._doc }));

            res.json(followers);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getFollowings(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.params.login })
                .populate("followings.user", "login name avatar_file");

            let { followings } = user._doc;
            followings = followings.map(f => ({ ...f.user._doc }));

            res.json(followings);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async follow(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                { $push: { 
                    followings: { 
                        user: req.body.userId 
                    } 
                } 
                }
            );

            await UserModel.updateOne(
                { _id: req.body.userId },
                { $push: {
                    followers: {
                        user: req.userId
                    }
                }
                }
            );

            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async unfollow(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                { $pull: { 
                    followings: { 
                        user: req.params.userId 
                    } 
                } 
                }
            );

            await UserModel.updateOne(
                { _id: req.params.userId },
                { $pull: {
                    followers: {
                        user: req.userId
                    }
                }
                }
            );

            res.json(true)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async removeFollower(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                { $pull: { 
                    followers: { 
                        user: req.params.userId 
                    } 
                } 
                }
            );

            await UserModel.updateOne(
                { _id: req.params.userId },
                { $pull: {
                    followings: {
                        user: req.userId
                    }
                }
                }
            );

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = ProfilesController;