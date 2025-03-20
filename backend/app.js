const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");

const usersController = require("./controllers/usersController.js");
const authController = require("./controllers/authController.js");
const articleRoutes = require("./controllers/articleController.js");

const app = express();

require("dotenv").config();
app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true,
	})
);

app.use(express.json());

app.use(
	session({
		secret: process.env.SECRET || "secret_key_100",
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authController);
app.use("/users", usersController);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
	res.send("Welcome To Novus");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
