const express = require("express");
const router = express.Router();
const Taxi = require("../models/Taxi");

router.post("/", async (req, res) => {
    const { PickUp_Location, Drop_Location, PickUp_Date, PickUp_Time } = req.body;

    // Validate input fields
    if (!PickUp_Location || !Drop_Location || !PickUp_Date || !PickUp_Time) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse and validate the PickUp_Date field
    const parsedDate = new Date(PickUp_Date);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Parse and validate the PickUp_Time field
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:mm format
    if (!timeRegex.test(PickUp_Time)) {
        return res.status(400).json({ error: "Invalid time format. Use HH:mm." });
    }

    try {
        const newTaxi = await Taxi.create({
            PickUp_Location,
            Drop_Location,
            PickUp_Date: parsedDate,
            PickUp_Time,
        });

        return res.status(201).json({
            success: true,
            message: "Taxi added successfully",
            taxi: newTaxi,
        });
    } catch (error) {
        console.error("Error adding taxi:", error);
        return res.status(500).json({ error: "Failed to add taxi" });
    }
});

router.get("/", async (req, res) => {
    try {
        const taxis = await Taxi.find({}, "-__v"); // Exclude the __v field
        res.status(200).json(taxis);
    } catch (error) {
        console.error("Error fetching taxis:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
