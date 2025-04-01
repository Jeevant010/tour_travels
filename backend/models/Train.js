const mongoose = require("mongoose");

const Train = new mongoose.Schema({
    Departure_Form : {
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
    AC_Type : {
        type : String,
        required : true,
    },
});

const TrainModel = mongoose.model("Train",Train);

module.exports = TrainModel;