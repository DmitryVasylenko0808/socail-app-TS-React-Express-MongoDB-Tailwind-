const { body } = require("express-validator");

const addCommentValidation = [
    body("text", "Text is required").trim().notEmpty()
]

module.exports = { addCommentValidation };