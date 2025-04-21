const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// Create a new hotel booking
router.post("/book", async (req, res) => {
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

module.exports = router;