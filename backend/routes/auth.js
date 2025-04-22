const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const passport = require("passport");


router.post("/signup", async (req, res) => {
    try {
        const { userName, fullName, email, password, confirmPassword, phone, address } = req.body;
        
        
        if (!email || !password || !fullName || !confirmPassword || !userName || !phone || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "A user with this email already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserData = await User.create({
            userName,
            fullName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            phone,
            address
        });
        const newUser = await User.create(newUserData);

        const token = await getToken(email, newUser);

        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password;
        delete userToReturn.confirmPassword;
        userToReturn.token = token;

        return res.status(201).json(userToReturn);

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = await getToken(user.email, user);

        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/get/me", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/get/user/:userId", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;