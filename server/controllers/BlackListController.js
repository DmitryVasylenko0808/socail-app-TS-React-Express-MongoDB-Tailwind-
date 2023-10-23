const UserModel = require("../models/User");

class BlackListController {
    static async get(req, res) {
        try {
            const user = await UserModel.findById(req.userId)
                .populate("black_list.user", "login name avatar_file");

            let { black_list } = user._doc;
            black_list = black_list.map(item => item.user);

            res.json(black_list);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async add(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                { 
                    $push: {
                        black_list: { user: req.body.userId }
                    } 
                }
            )

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async remove(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                { 
                    $pull: {
                        black_list: {
                            user: req.params.userId
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

module.exports = BlackListController;