const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/auth"); // Import auth middleware

router.post("/me", async (req, res) => {
    const { My_Name, email, phone, message } = req.body;

    if (!My_Name || !email || !phone || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newContact = await Contact.create({ 
            My_Name, 
            email, 
            phone, 
            message 
        });
        return res.status(201).json({ 
            success: true, 
            message: "Contact form submitted successfully",
            contact: newContact 
        });
    } catch (error) {
        console.error("Error saving contact:", error.message);
        return res.status(500).json({ 
            error: "Failed to save contact data",
            details: error.message 
        });
    }
});

// Retrieve all contact submissions
router.get("/", authMiddleware, async (req, res) => {
    try {
        console.log("Authorization header:", req.headers.authorization); // Debugging header
        if (!req.user) {
            console.error("Unauthorized access: No user found in request");
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        const contacts = await Contact.find().lean();
        return res.status(200).json({ 
            success: true, 
            contacts 
        });
    } catch (error) {
        console.error("Error retrieving contacts:", error.message);
        return res.status(500).json({ 
            error: "Failed to retrieve contact data",
            details: error.message 
        });
    }
});

module.exports = router;