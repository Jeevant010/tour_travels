const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    Location: { type: String, required: true },
    Checkin_Date: { type: Date, required: true },
    Checkout_Date: { type: Date, required: true },
    No_of_Rooms: { type: Number, required: true },
    Guests: { type: Number, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);