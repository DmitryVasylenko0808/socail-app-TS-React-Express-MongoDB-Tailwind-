const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const CommentsController = require("../controllers/CommensContoller");
const { addCommentValidation } = require("../validations/commentValidations");
const handleValidationErrors = require("../utils/handleValidationErrors");

const router = express.Router();

router.get("/:postId", CommentsController.getAllByPostId);
router.post("/", isAuthorized, addCommentValidation, handleValidationErrors, CommentsController.add); 
router.delete("/:postId/:commentId", isAuthorized, CommentsController.remove); 

module.exports = router;