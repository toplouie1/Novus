const express = require("express");
const auth = express.Router();
const { createUser } = require("../queries/users.js");
const { authUser } = require("../queries/auth.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

require("../passport/passportConfig.js");

auth.post("/sign_up", async (req, res) => {
	const { password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = req.body;
	user.password_hash = hashedPassword;

	delete user.password;

	const createdUser = await createUser(user);
	if (createdUser.id) {
		res.json({ success: true, result: createdUser });
	} else {
		res
			.status(500)
			.json({ success: false, error: "Error/Username already exists" });
	}
});

auth.post("/login", passport.authenticate("local"), async (req, res) => {
	const { username, password } = req.body;
	const userInfo = await authUser(username, password);
	try {
		if (!isNaN(userInfo.id)) {
			res.json({ success: true, result: userInfo });
		} else {
			res.status(500).json({ success: false, error: userInfo.error });
		}
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Incorrect Username or Password" });
	}
});

module.exports = auth;
