const express = require("express");


const app = express();
const port = 3000;


const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");



const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

app.use(express.json());
require("dotenv").config();

mongoose.connect(
        "mongodb+srv://newer:" +
        process.env.MONGO_PASSWORD +
        "@cluster0.afxf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {}
    )
    .then((x) => {
        console.log("connected to mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to mongo\n",err);
    });


    
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "supposedtobesecret";

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));




app.get("/",(req,res) => {
    res.send("Hello , World!");

});

app.use("/auth", authRoutes);


app.listen(port , () => {
    console.log("App is running on port : " + port);
});


app.get("/",(req,res) => {
    res.send("Hello , World!");

});

app.listen(port , () => {
    console.log("App is running on port : " + port);
});