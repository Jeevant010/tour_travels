const mongoose = require("mongoose");

const User = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    fullName: {
        type : String,
        required: true,
    },
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        private : true,
    },
    confirmPassword : {
        type : String,
        required : true,
        private: true,
    },
    phone : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
});

const UserModel = mongoose.model("User",User);

module.exports = UserModel;