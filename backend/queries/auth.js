const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

const authUser = async (username, password) => {
	try {
		const user = await db.one(
			"SELECT * FROM users WHERE username=$1",
			username
		);

		const match = await bcrypt.compare(password, user.password_hash);
		if (match) {
			const userInfo = {
				id: user.id,
				username: user.username,
				email: user.email,
			};
			return userInfo;
		}
	} catch (e) {
		return { error: "Username doesn't exist..." };
	}
};

module.exports = {
	authUser,
};
