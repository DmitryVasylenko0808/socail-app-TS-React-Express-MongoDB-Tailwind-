const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const PostsController = require("../controllers/PostsController");
const isInBlackList = require("../middlewares/isInBlackList");
const isPrivateUser = require("../middlewares/isPrivateUser");

const router = express.Router();

router.get("/limit/:limit/skip/:skip", PostsController.getAll);
router.get("/user/:userId", PostsController.getAllByUserId);
router.get("/user/:userId/post/:postId", isInBlackList, isPrivateUser, PostsController.getOneById);
router.get("/saved", isAuthorized, PostsController.getSaved);
router.post("/", isAuthorized, PostsController.create);
router.patch("/:postId", PostsController.edit);
router.patch("/like/:postId", isAuthorized, PostsController.like);
router.patch("/save/:postId", isAuthorized, PostsController.save);
router.delete("/:postId", isAuthorized, PostsController.remove);

module.exports = router;