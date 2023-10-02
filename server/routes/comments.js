const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const CommentsController = require("../controllers/CommensContoller");

const router = express.Router();

router.get("/:postId/limit/:limit/skip/:skip", CommentsController.getAllByPostId);
router.post("/", isAuthorized, CommentsController.add);
router.delete("/:postId/:commentId", isAuthorized, CommentsController.remove);

module.exports = router;