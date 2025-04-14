const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
    My_Name: {
        type: String,
        required: true,
    },
    email: {  // Changed from Your_Email to email to match route
        type: String,
        required: true,
    },
    phone: {  // Changed from Phone_Number to phone to match route
        type: String,
        required: true,
    },
    message: {  // Changed from Your_Message to message to match route
        type: String,
        required: true,
    },
}, { timestamps: true });  // Added timestamps for created/updated dates

const ContactModel = mongoose.model("Contact", Contact);

module.exports = ContactModel;