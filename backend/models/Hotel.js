const mongoose = require("mongoose");

const Hotel = new mongoose.Schema({
    Location : {
        type : String,
        required : true,
    },
    Checkin_Date : {
        type : String,
        required : true,
    },
    Checkout_Date : {
        type : String,
        required : true,
    },
    No_of_Rooms : {
        type : String,
        required : true,
    },
    Guests : {
        type : String,
        required : true,
    },
});

const HotelModel = mongoose.model("Hotel",Hotel);

module.exports = HotelModel;