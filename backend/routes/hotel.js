const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

router.post("/", async (req, res) => {
    const { Location, Checkin_Date, Checkout_Date, No_of_Rooms, Guests } = req.body;

    // Validate input fields
    if (!Location || !Checkin_Date || !Checkout_Date || !No_of_Rooms || !Guests) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date strings into Date objects
    const parsedCheckinDate = new Date(Checkin_Date);
    const parsedCheckoutDate = new Date(Checkout_Date);

    if (isNaN(parsedCheckinDate) || isNaN(parsedCheckoutDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newBooking = await Hotel.create({
            Location,
            Checkin_Date: parsedCheckinDate,
            Checkout_Date: parsedCheckoutDate,
            No_of_Rooms,
            Guests,
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

router.get("/", async (req, res) => {
  try {
    const hotelBookings = [];
    res.status(200).json(hotelBookings);
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;