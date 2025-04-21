const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

router.post("/", async (req, res) => {
    const { Flight_Number, Departure_Date, Arrival_Date, Passenger_Name, Email, Phone } = req.body;

    // Validate input fields
    if (!Flight_Number || !Departure_Date || !Arrival_Date || !Passenger_Name || !Email || !Phone) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Parse date strings into Date objects
    const parsedDepartureDate = new Date(Departure_Date);
    const parsedArrivalDate = new Date(Arrival_Date);

    if (isNaN(parsedDepartureDate) || isNaN(parsedArrivalDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newBooking = await Flight.create({
            Flight_Number,
            Departure_Date: parsedDepartureDate,
            Arrival_Date: parsedArrivalDate,
            Passenger_Name,
            Email,
            Phone,
        });

        return res.status(201).json({
            success: true,
            message: "Flight booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error during flight booking submission:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/", async (req, res) => {
    try {
        const flightBookings = []; // Mocked data
        res.status(200).json(flightBookings);
    } catch (error) {
        console.error("Error fetching flight bookings:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
