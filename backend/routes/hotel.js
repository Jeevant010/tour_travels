const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// Create a new hotel booking
router.post("/hotels", async (req, res) => {
    const { location, checkinDate, checkoutDate, rooms, guests } = req.body;

    if (!location || !checkinDate || !checkoutDate || !rooms || !guests) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newBooking = await Hotel.create({
            Location: location,
            Checkin_Date: checkinDate,
            Checkout_Date: checkoutDate,
            No_of_Rooms: rooms,
            Guests: guests,
        });

        return res.status(201).json({
            success: true,
            message: "Hotel booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating hotel booking:", error);
        return res.status(500).json({ error: "Failed to create booking" });
    }
});

// Handle hotel booking submissions
router.post("/", async (req, res) => {
  try {
    const { hotelName, customerName, email, phone } = req.body;

    // Validate input
    if (!hotelName || !customerName || !email || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    res.status(201).json({ message: "Hotel booking submitted successfully." });
  } catch (error) {
    console.error("Error during hotel booking submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get all hotel bookings
router.get("/", async (req, res) => {
  try {
    const hotelBookings = []; // Mocked data
    res.status(200).json(hotelBookings);
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;