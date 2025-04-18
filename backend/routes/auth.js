const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking"); // Make sure to import Booking model
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const authMiddleware = require("../middleware/auth"); // Make sure you have this middleware

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
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password -__v")
            .lean();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get User Bookings
router.get("/bookings", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("tour", "name description price") // Adjust fields as needed
            .lean();

        return res.status(200).json(bookings);

    } catch (error) {
        console.error("Get bookings error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;