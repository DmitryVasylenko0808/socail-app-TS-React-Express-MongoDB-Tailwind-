const express = require("express");
const AuthController = require("../controllers/AuthController");
const { signUpValidation, signInValidation } = require("../validations/userValidations");
const handleValidationErrors = require("../utils/handleValidationErrors");

const router = express.Router();

router.post("/signup", signUpValidation, handleValidationErrors, AuthController.signUp);
router.post("/signin", signInValidation, handleValidationErrors, AuthController.signIn);

module.exports = router;