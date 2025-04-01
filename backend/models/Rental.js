const mongoose = require("mongoose");

const Rental = new mongoose.Schema({
    State : {
        type : String,
        required : true,
    },
    City : {
        type : String,
        required : true,
    },
    Vehicle_Type : {
        type : String,
        required : true,
    },
    Duration : {
        type : Number,
        required : true,
    },
    Date : {
        type : String,
        required : true,
    },
    Location : {
        type : String,
        required : true,
    },
});

const RentalModel = mongoose.model("Rental",Rental);

module.exports = RentalModel;