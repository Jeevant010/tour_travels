const mongoose = require("mongoose");

const Flight = new mongoose.Schema({
    Departure_From : {
        type : String,
        required : true,
    },
    Going_to : {
        type : String,
        required : true,
    },
    Departure_Date : {
        type : String,
        required : true,
    },
    Return_Date : {
        type : String,
    },
    Travelers : {
        type : String,
        required : true,
    },
    Class : {
        type : String,
        required : true,
    },
});

const FlightModel = mongoose.model("Flight",Flight);

module.exports = FlightModel;