const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

router.post("/", async (req, res) => {
    const { Rental_Type, Start_Date, End_Date, Customer_Name, Phone } = req.body;

    // Validate input fields
    if (!Rental_Type || !Start_Date || !End_Date || !Customer_Name || !Phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date strings into Date objects
    const parsedStartDate = new Date(Start_Date);
    const parsedEndDate = new Date(End_Date);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    try {
        const newBooking = await Rental.create({
            Rental_Type,
            Start_Date: parsedStartDate,
            End_Date: parsedEndDate,
            Customer_Name,
            Phone,
        });

        return res.status(201).json({
            success: true,
            message: "Rental booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating rental booking:", error);
        return res.status(500).json({ error: "Failed to create booking" });
    }
});

router.get("/", async (req, res) => {
    try {
        const rentalBookings = [];
        res.status(200).json(rentalBookings);
    } catch (error) {
        console.error("Error fetching rental bookings:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
