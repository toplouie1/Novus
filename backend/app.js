const cors = require("cors");
const express = require("express");
const passport = require("passport");

const app = express();
const session = require("express-session");

const usersController = require("./controllers/usersController.js");
const authController = require("./controllers/authController.js");

app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authController);
app.use("/users", usersController);

app.get("/", (req, res) => {
	res.send("Welcome To Novus");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
