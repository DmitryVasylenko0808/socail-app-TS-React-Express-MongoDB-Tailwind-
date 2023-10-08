const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const signUpValidation = [
    body("login", "Login is required").trim().notEmpty(),
    body("login", "Login must have more than 2 characters").trim().isLength({ min: 3 }),
    body("login").custom(async value => {
        const user = await UserModel.find({ login: value });
        if (user.length !== 0) {
            throw new Error("This login is already exists");
        }

        return true;
    }),
    body("password", "Password is required").trim().notEmpty(),
    body("password", "Password must have more than 7 characters").trim().isLength({ min: 8 }),
    body("password_confirm").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        }

        return true;
    }),
    body("name", "Name is required").trim().notEmpty(),
    body("name", "Name must have more than 1 characters").trim().isLength({ min: 2 }),
    body("avatar_file").custom((value, { req }) => {
        if (req.files && req.files.avatar_file) {
            const avatar_file = req.files.avatar_file;

            if (avatar_file.mimetype === "image/jpeg" || avatar_file.mimetype === "image/jpg" 
                || avatar_file.mimetype === "image/bmp" || avatar_file.mimetype === "image/png") {
                return true;
            } else {
                throw new Error("Invalid format of file. Choose .jpeg, .bmp or .png format");
            }
        }

        return true;
    })
];

const signInValidation = [
    body("login", "Login is required").trim().notEmpty(),
    body("login").custom(async (value, { req }) => {
        const user = await UserModel.findOne({ login: value });
        if (!user) {
            throw new Error("Invalid login or password");
        }

        req.userId = user._id;
        req.userLogin = user.login;
        req.userPassword = user.password_hash;

        return true;
    }),
    body("password", "Password is required").trim().notEmpty(),
    body("password").custom(async (value, { req }) => {
        const isValidPass = await bcrypt.compare(value, req.userPassword);
        if (!isValidPass) {
            throw new Error("Invalid login or password")
        }

        return true;
    })
];

const editUserValidation = [
    body("name", "Name is required").trim().notEmpty(),
    body("name", "Name must have more than 1 characters").trim().isLength({ min: 2 }),
    body("avatar_file").custom((value, { req }) => {
        if (req.files !== null && req.files.avatar_file !== null) {
            const avatar_file = req.files.avatar_file;

            if (avatar_file.mimetype === "image/jpeg" || avatar_file.mimetype === "image/bmp" || avatar_file.mimetype === "image/png") {
                return true;
            } else {
                throw new Error("Invalid format of file. Choose .jpeg, .bmp or .png format");
            }
        }

        return true;
    })
]



module.exports = { signUpValidation, signInValidation, editUserValidation };