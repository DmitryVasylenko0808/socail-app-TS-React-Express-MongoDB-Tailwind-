const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password_hash: {
            type: String,
            required: true
        },
        is_private: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        location: {
            country: String,
            city: String
        },
        about: String,
        avatar_file: String,

        saved_posts: [
            {
                post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
            }
        ],

        followers: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
        followings: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
        black_list: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ]
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;