const { body } = require("express-validator");

const createPostValidation = [
    body("text", "Text is required").trim().notEmpty(),
    body("image").custom((value, { req }) => {
        if (req.files !== null && req.files.image !== null) {
            const image = req.files.image;

            if (image.mimetype === "image/jpeg" || image.mimetype === "image/bmp" || image.mimetype === "image/png") {
                return true;
            } else {
                throw new Error("Invalid format of file. Choose .jpeg, .bmp or .png format");
            }
        }

        return true;
    })
]



module.exports = { createPostValidation };