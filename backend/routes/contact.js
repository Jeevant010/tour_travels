const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
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
        console.error("Error saving contact:", error);
        return res.status(500).json({ 
            error: "Failed to save contact data",
            details: error.message 
        });
    }
});

router.get("/", (req, res) => {
    // ...handle contact retrieval...
    res.send("Contact route");
});

module.exports = router;