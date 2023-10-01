const express = require("express");
const ProfilesController = require("../controllers/ProfilesController");
const { editUserValidation } = require("../validations/userValidations");
const handleValidationErrors = require("../utils/handleValidationErrors");
const isAuthorized = require("../middlewares/isAuthorized");

const router = express.Router();

router.get("/:login", ProfilesController.get);
router.get("/:login/followers", isAuthorized, ProfilesController.getFollowers);
router.get("/:login/followings", isAuthorized, ProfilesController.getFollowings);
router.post("/follow", isAuthorized, ProfilesController.follow);
router.patch("/edit", isAuthorized, editUserValidation, handleValidationErrors, ProfilesController.edit);
router.patch("/toggle_private", isAuthorized, ProfilesController.togglePrivate);
router.delete("/delete", isAuthorized, ProfilesController.delete);
router.delete("/unfollow/:userId", isAuthorized, ProfilesController.unfollow);
router.delete("/remove_follower/:userId", isAuthorized, ProfilesController.removeFollower);

module.exports = router;