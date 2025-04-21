const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const core = require("cors");

app.use(core({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

app.use(express.json());
require("dotenv").config();

mongoose.connect(
    
    "mongodb+srv://Tours:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.afxf5.mongodb.net/Tour_Travels?retryWrites=true&w=majority&appName=Cluster0",
    {}
)
.then((x) => {
    console.log("connected to mongo!");
})
.catch((err) => {
    console.log("Error while connecting to mongo\n",err);
});

mongoose.connect(
    "mongodb+srv://Tours:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.afxf5.mongodb.net/Tour_Travels?retryWrites=true&w=majority&appName=Cluster0"
)
.then((x) => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.error("Error while connecting to MongoDB:", err);
});

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "supposedtobe";

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
try {
    const user = await User.findOne({ _id: jwt_payload.id });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
} catch (err) {
    return done(err, false);
}
}));

// Import additional routes
const flightsRoute = require("./routes/flights");
const rentalRoute = require("./routes/rental");
const hotelRoute = require("./routes/hotel");
const trainRoute = require("./routes/train");
const taxiRoute = require("./routes/taxi");
const contactRoute = require("./routes/contact");

app.use("/auth", authRoutes);

// Use additional routes
app.use("/api/flights", flightsRoute);
app.use("/api/rental", rentalRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/train", trainRoute);
app.use("/api/taxi", taxiRoute);
app.use("/api/contact", contactRoute);

app.get("/",(req,res) => {
    res.send("Hello , World!");

});

app.listen(port , () => {
    console.log("App is running on port : " + port);
});