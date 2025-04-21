const express = require("express");
const router = express.Router();

// Handle taxi booking submissions
router.post("/", async (req, res) => {
  try {
    const { pickupLocation, dropLocation, customerName, phone } = req.body;

    // Validate input
    if (!pickupLocation || !dropLocation || !customerName || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    res.status(201).json({ message: "Taxi booking submitted successfully." });
  } catch (error) {
    console.error("Error during taxi booking submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all taxi bookings
router.get("/", async (req, res) => {
  try {
    const taxiBookings = []; // Mocked data
    res.status(200).json(taxiBookings);
  } catch (error) {
    console.error("Error fetching taxi bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
