const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking"); // Make sure to import Booking model
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const authMiddleware = require("../middleware/auth"); // Make sure you have this middleware
const passport = require("passport"); // Import passport

// User Registration
router.post("/signup", async (req, res) => {
    try {
        const { userName, fullName, email, password, confirmPassword, phone, address } = req.body;
        
        // Validation
        if (!email || !password || !fullName || !confirmPassword || !userName || !phone || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "A user with this email already exists" });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            userName,
            fullName,
            email,
            password: hashedPassword,
            phone,
            address
        });

        // Generate token
        const token = await getToken(email, newUser);

        // Return user data without password
        const userToReturn = newUser.toObject();
        delete userToReturn.password;
        delete userToReturn.confirmPassword;
        userToReturn.token = token;

        return res.status(201).json(userToReturn);

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = await getToken(user.email, user);

        // Return user data without password
        const userToReturn = user.toObject();
        delete userToReturn.password;
        userToReturn.token = token;

        return res.status(200).json(userToReturn);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get Current User Profile
router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("Authorization header:", req.headers.authorization); // Debugging header
    if (!req.user) {
        console.error("Unauthorized access: No user found in request");
        return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    console.log("Authenticated user:", req.user); // Debugging user data
    res.json({
        success: true,
        user: req.user, // Assuming `req.user` contains the authenticated user data
    });
});

// Token validation endpoint
router.get('/validate', authMiddleware, (req, res) => {
    if (!req.user) {
        console.error("Token validation failed: No user found in request");
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    console.log("Token validation successful for user:", req.user);
    res.status(200).json({ valid: true });
});

// Logout endpoint
router.post('/logout', authMiddleware, (req, res) => {
    if (!req.user) {
        console.error("Logout failed: No user found in request");
        return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }
    res.clearCookie('token');
    console.log("User logged out successfully:", req.user);
    res.status(200).json({ message: 'Logged out successfully' });
});

// Get User Bookings
router.get("/bookings", authMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        const bookings = await Booking.find({ user: req.user.id })
            .populate("tour", "name description price") // Adjust fields as needed
            .lean();

        return res.status(200).json(bookings);

    } catch (error) {
        console.error("Get bookings error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;