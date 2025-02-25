const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        type : String,
        required: true,
    },
    lastName : {
        type: String,
    },
    email : {
        type: String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    subscribedArtists: {
        type : String,
        default : "",
    },
    likedPlaylists : {
        type : String,
        default : "",
    },
});

const UserModel = mongoose.model("User",User);

module.exports = UserModel;