const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        image: String,
        likes_list: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
        saves_list: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ]
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;