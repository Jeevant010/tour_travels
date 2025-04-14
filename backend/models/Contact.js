const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
    My_Name: {
        type: String,
        required: true,
    },
    email: {  
        type: String,
        required: true,
    },
    phone: {  
        type: String,
        required: true,
    },
    message: {  
        type: String,
        required: true,
    },
}, { timestamps: true });  

const ContactModel = mongoose.model("Contact", Contact);

module.exports = ContactModel;