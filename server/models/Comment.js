const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const CommentModel = mongoose.model("Post", CommentSchema);

module.exports = CommentModel;