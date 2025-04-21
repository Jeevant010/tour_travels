const express = require("express");
const router = express.Router();
const Train = require("../models/Train");

router.post("/", async (req, res) => {
    const { Departure_Form, Going_to, Departure_Date, AC_Type } = req.body;

    // Validate input fields
    if (!Departure_Form || !Going_to || !Departure_Date || !AC_Type) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newTrain = await Train.create({
            Departure_Form,
            Going_to,
            Departure_Date,
            AC_Type,
        });

        return res.status(201).json({
            success: true,
            message: "Train added successfully",
            train: newTrain,
        });
    } catch (error) {
        console.error("Error adding train:", error);
        return res.status(500).json({ error: "Failed to add train" });
    }
});

router.get("/", async (req, res) => {
    try {
        const trains = await Train.find({}, "-__v"); // Exclude the __v field
        res.status(200).json(trains);
    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
