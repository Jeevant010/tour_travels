const express = require("express");
const router = express.Router();
const Train = require("../models/Train");

router.post("/", async (req, res) => {
    const { Train_Number, Departure_Date, Arrival_Date, Passenger_Name, Email, Phone, Class, Fare } = req.body;

    // Validate input fields
    if (!Train_Number || !Departure_Date || !Arrival_Date || !Passenger_Name || !Email || !Phone || !Class || !Fare) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date strings into Date objects
    const parsedDepartureDate = new Date(Departure_Date);
    const parsedArrivalDate = new Date(Arrival_Date);

    if (isNaN(parsedDepartureDate) || isNaN(parsedArrivalDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newBooking = await Train.create({
            Train_Number,
            Departure_Date: parsedDepartureDate,
            Arrival_Date: parsedArrivalDate,
            Passenger_Name,
            Email,
            Phone,
            Class,
            Fare,
        });

        return res.status(201).json({
            success: true,
            message: "Train booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating train booking:", error);
        return res.status(500).json({ error: "Failed to create booking" });
    }
});

router.get("/", async (req, res) => {
    try {
        const trainBookings = await Train.find({}, "-__v"); // Exclude the __v field
        res.status(200).json(trainBookings);
    } catch (error) {
        console.error("Error fetching train bookings:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
