const PostModel = require("../models/Post");
const CommentModel = require("../models/Comment");

class CommentsController {
    static async getAllByPostId(req, res) {
        try {
            const comments = await CommentModel.find({ post: req.params.postId })
                .skip(req.params.limit * req.params.skip)
                .limit(req.params.limit)
                .populate("user", "login name avatar_file");

            if (comments.length === 0) {
                return res.status(404).json({ success: false, message: "Comments are not found" });
            }

            res.json({ success: true, comments });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    static async add(req, res) {
        try {
            if (req.body.text.length === 0) {
                return res.status(400).json({ success: false, message: "Text is required" });
            }

            const post = await PostModel.findById(req.body.postId);
            if (!post) {
                return res.status(404).json({ success: false, message: "Post is not found" });
            }

            const doc = new CommentModel({
                user: req.userId,
                post: req.body.postId,
                text: req.body.text
            });
            await doc.save();

            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    static async remove(req, res) {
        try {
            const post = await PostModel.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ success: false, message: "Post is not found" });
            }

            const comment = await CommentModel.findById(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ success: false, message: "Cannot delete the comment" });
            }

            await CommentModel.deleteOne({ _id: req.params.commentId});

            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}

module.exports = CommentsController;