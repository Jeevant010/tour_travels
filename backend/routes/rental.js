const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

router.post("/", async (req, res) => {
    const { State, City, Vehicle_Type, Duration, Date: rentalDate, Location } = req.body;

    
    if (!State || !City || !Vehicle_Type || !Duration || !rentalDate || !Location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    

    
    const parsedDate = new Date(rentalDate);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newRental = await Rental.create({
            State,
            City,
            Vehicle_Type,
            Duration,
            Date: parsedDate,
            Location,
        });

        return res.status(201).json({
            success: true,
            message: "Rental added successfully",
            rental: newRental,
        });
    } catch (error) {
        console.error("Error adding rental:", error);
        return res.status(500).json({ error: "Failed to add rental" });
    }
});

router.get("/", async (req, res) => {
    try {
        const rentals = await Rental.find({}, "-__v");
        res.status(200).json(rentals);
    } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
