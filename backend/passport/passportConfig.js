const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

async function authenticateUser(username, password, done) {
	try {
		const user = await db.oneOrNone("SELECT * FROM users WHERE username=$1", [
			username,
		]);

		if (!user) {
			return done(null, false, { message: "User not found" });
		}

		const isValid = await bcrypt.compare(password, user.password_hash);

		if (isValid) {
			return done(null, user);
		} else {
			return done(null, false, { message: "Invalid password" });
		}
	} catch (error) {
		return done(error);
	}
}

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			session: true,
		},
		authenticateUser
	)
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async function (userId, done) {
	try {
		const user = await db.oneOrNone("SELECT * FROM users WHERE id=$1", [
			userId,
		]);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		done(error);
	}
});

module.exports = passport;
