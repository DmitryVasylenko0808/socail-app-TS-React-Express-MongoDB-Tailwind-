const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        likes_list: [
            {
                user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
        saves_list: [
            {
                user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ]
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;