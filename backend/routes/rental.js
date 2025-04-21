const express = require("express");
const router = express.Router();

// Handle rental booking submissions
router.post("/", async (req, res) => {
  try {
    const { rentalType, customerName, email, phone } = req.body;

    // Validate input
    if (!rentalType || !customerName || !email || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    res.status(201).json({ message: "Rental booking submitted successfully." });
  } catch (error) {
    console.error("Error during rental booking submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all rental bookings
router.get("/", async (req, res) => {
  try {
    const rentalBookings = []; // Mocked data
    res.status(200).json(rentalBookings);
  } catch (error) {
    console.error("Error fetching rental bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
