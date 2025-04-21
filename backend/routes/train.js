const express = require("express");
const router = express.Router();

// Handle train booking submissions
router.post("/", async (req, res) => {
  try {
    const { trainNumber, passengerName, email, phone } = req.body;

    // Validate input
    if (!trainNumber || !passengerName || !email || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    res.status(201).json({ message: "Train booking submitted successfully." });
  } catch (error) {
    console.error("Error during train booking submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all train bookings
router.get("/", async (req, res) => {
  try {
    const trainBookings = []; // Mocked data
    res.status(200).json(trainBookings);
  } catch (error) {
    console.error("Error fetching train bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
