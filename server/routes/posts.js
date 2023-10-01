const express = require("express");

const router = express.Router();

router.get("/");
router.get("/:postId");
router.get("/user/:userId");
router.post("/");
router.patch("/:postId");
router.patch("/like/:postId");
router.patch("/save/:postId");
router.delete("/:postId");

module.exports = router;