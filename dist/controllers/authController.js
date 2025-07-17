"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, job } = req.body;
        // Check if user exists
        const userExists = await userModel_1.default.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create user
        const user = await userModel_1.default.create({
            username,
            email,
            password,
            phoneNumber,
            job,
        });
        if (user) {
            return res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                job: user.job,
                token: generateToken(user._id.toString()),
            });
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ message: errorMessage });
    }
};
exports.registerUser = registerUser;
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user email
        const user = await userModel_1.default.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                job: user.job,
                token: generateToken(user._id.toString()),
            });
        }
        else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ message: errorMessage });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map