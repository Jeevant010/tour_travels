const express = require("express");
const router = express.Router();

// Handle flight booking submissions
router.post("/", async (req, res) => {
  try {
    const { flightNumber, passengerName, email, phone } = req.body;

    // Validate input
    if (!flightNumber || !passengerName || !email || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save flight booking to the database (mocked for now)
    // const newFlightBooking = new FlightBooking({ flightNumber, passengerName, email, phone });
    // await newFlightBooking.save();

    res.status(201).json({ message: "Flight booking submitted successfully." });
  } catch (error) {
    console.error("Error during flight booking submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all flight bookings
router.get("/", async (req, res) => {
  try {
    // const flightBookings = await FlightBooking.find();
    const flightBookings = []; // Mocked data
    res.status(200).json(flightBookings);
  } catch (error) {
    console.error("Error fetching flight bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
