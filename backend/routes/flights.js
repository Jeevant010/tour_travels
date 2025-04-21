const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

router.post("/", async (req, res) => {
  

    const { Departure_From, Going_to, Departure_Date, Return_Date, Travelers, Class } = req.body;

    // Validate input fields
    if (!Departure_From || !Going_to || !Departure_Date || !Return_Date || !Travelers || !Class) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date strings into Date objects for validation
    const parsedDepartureDate = new Date(Departure_Date);
    const parsedReturnDate = new Date(Return_Date);

    if (isNaN(parsedDepartureDate) || isNaN(parsedReturnDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newFlight = await Flight.create({
            Departure_From,
            Going_to,
            Departure_Date: parsedDepartureDate,
            Return_Date: parsedReturnDate,
            Travelers,
            Class,
        });

        return res.status(201).json({
            success: true,
            message: "Flight added successfully",
            flight: newFlight,
        });
    } catch (error) {
        console.error("Error adding flight:", error);
        return res.status(500).json({ error: "Failed to add flight" });
    }
});

router.get("/", async (req, res) => {
    try {
        const flights = await Flight.find({}, "-__v"); // Exclude the __v field
        res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
