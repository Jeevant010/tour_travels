const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Existing route for user account details
router.get("/me", authMiddleware, async (req, res) => {
    try {
        console.log("Authorization header:", req.headers.authorization);
        if (!req.user) {
            console.error("Unauthorized access: No user found in request");
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        const user = await User.findById(req.user.id).select("-password").lean();
        if (!user) {
            console.error("User not found in database for ID:", req.user.id);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User retrieved successfully:", user);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error retrieving account details:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get all users
router.get("/get/users", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const users = await User.find().select("-password").lean();
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error retrieving users:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get a specific user by ID
router.get("/get/user/:userId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password").lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Search users by name
router.get("/get/username/:userName", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { userName } = req.params;
        const users = await User.find({ userName: { $regex: userName, $options: "i" } }).select("-password").lean();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found with the given name" });
        }
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error searching users:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
