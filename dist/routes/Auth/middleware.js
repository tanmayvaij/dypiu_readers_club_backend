"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
// middleware for hashing passwords
const hashPassword = async (req, res, next) => {
    // getting password, cpassword from body
    const { password, cpassword } = req.body;
    // Checking is password fields are empty or not, returning error message if fields are empty or passwords missmatch
    if (password == "" || cpassword == "" || password != cpassword)
        return res.json({ success: false, message: "Passwords missing or mismatch" });
    // Generating salt and creating a hashed password
    const salt = await (0, bcrypt_1.genSalt)(10);
    const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
    // replacing user given plain text password with hashed password
    req.body.password = hashedPassword;
    next();
};
exports.hashPassword = hashPassword;
// middleware for validating user token
const validateToken = (req, res, next) => {
    // reading authtoken from header
    const authtoken = req.header("authtoken");
    // checking if authtoken exists, else throwing error message
    if (!authtoken)
        return res.json({ success: false, message: "Verify using a valid token" });
    try {
        // verifying the token and getting user details
        const user = (0, jsonwebtoken_1.verify)(authtoken, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        return res.json({ success: false, message: err });
    }
};
exports.validateToken = validateToken;
