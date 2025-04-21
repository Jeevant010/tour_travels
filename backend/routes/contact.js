const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { My_Name, email, phone, message } = req.body;

    // Validate input
    if (!My_Name) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required." });
    }
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Save contact message to the database
    const newContact = new Contact({ My_Name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message submitted successfully." });
  } catch (error) {
    console.error("Error during contact submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all contact messages (for admin use)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
