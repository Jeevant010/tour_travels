const express = require("express");
const router = express.Router();
const Taxi = require("../models/Taxi");

router.post("/", async (req, res) => {
    const { Pickup_Location, Drop_Location, Pickup_Date, Customer_Name, Phone } = req.body;

    // Validate input fields
    if (!Pickup_Location || !Drop_Location || !Pickup_Date || !Customer_Name || !Phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date strings into Date objects
    const parsedPickupDate = new Date(Pickup_Date);

    if (isNaN(parsedPickupDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newBooking = await Taxi.create({
            Pickup_Location,
            Drop_Location,
            Pickup_Date: parsedPickupDate,
            Customer_Name,
            Phone,
        });

        return res.status(201).json({
            success: true,
            message: "Taxi booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating taxi booking:", error);
        return res.status(500).json({ error: "Failed to create booking" });
    }
});

router.get("/", async (req, res) => {
    try {
        const taxiBookings = [];
        res.status(200).json(taxiBookings);
    } catch (error) {
        console.error("Error fetching taxi bookings:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
