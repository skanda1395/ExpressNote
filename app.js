const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// set up view engine
app.set("view engine", "ejs");

// middleware and staic files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));


// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Listening for requests on port 3000");
});