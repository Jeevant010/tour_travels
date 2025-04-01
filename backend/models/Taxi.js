const mongoose = require("mongoose");

const Taxi = new mongoose.Schema({
    PickUp_Location : {
        type : String,
        required : true,
    },
    Drop_Location : {
        type : String,
        required : true,
    },
    PickUp_Date : {
        type : String,
        required : true,
    },
    PickUp_Time : {
        type : String,
        required : true,
    },
});

const TaxiModel = mongoose.model("Taxi",Taxi);

module.exports = TaxiModel;