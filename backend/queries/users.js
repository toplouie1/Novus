const db = require("../db/dbConfig.js");

const getOneUser = async (id) => {
	try {
		const user = await db.one("SELECT * FROM users WHERE id=$1", id);
		return user;
	} catch (error) {
		return error;
	}
};

const getAllUsers = async () => {
	try {
		const allUsers = await db.any("SELECT * FROM users");
		return allUsers;
	} catch (error) {
		return error;
	}
};
const createUser = async (user) => {
	try {
		const createdUser = await db.one(
			"INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING *",
			[user.username, user.email, user.password_hash]
		);
		return createdUser;
	} catch (error) {
		return error;
	}
};

const deleteUser = async (id) => {
	try {
		const deletedUser = await db.one(
			"DELETE FROM users WHERE id=$1 RETURNING *",
			id
		);
		return deletedUser;
	} catch (error) {
		return error;
	}
};

const updateUser = async (id, user) => {
	try {
		const updatedUser = await db.one(
			"UPDATE users SET username=$1, email=$2, password_hash=$3 WHERE id=$4 RETURNING *",
			[user.username, user.email, user.password_hash, id]
		);
		return updatedUser;
	} catch (error) {
		return error;
	}
};

module.exports = {
	updateUser,
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
};
