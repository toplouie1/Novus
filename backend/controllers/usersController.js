const express = require("express");
const users = express.Router();

const {
	updateUser,
	deleteUser,
	getAllUsers,
	getOneUser,
} = require("../queries/users.js");

users.get("/", async (req, res) => {
	const users = await getAllUsers();
	if (users[0]) {
		res.json({ success: true, result: users });
	} else res.status(500).json({ success: false, error: "server error..." });
});

users.get("/:id", async (req, res) => {
	const { id } = req.params;

	const user = await getOneUser(id);
	if (user.id) {
		res.json({ success: true, result: user });
	} else
		res
			.status(500)
			.json({ success: false, error: `server error, no user at index ${id}` });
});

users.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedUser = await deleteUser(id);
	if (deletedUser.id) {
		res.json({ success: true, result: deletedUser });
	} else
		res
			.status(500)
			.json({ success: false, error: `unable to delete user ${id}` });
});

users.put("/:id", async (req, res) => {
	const { id } = req.params;
	const user = req.body;

	const updatedUser = await updateUser(id, user);
	if (updatedUser.id) {
		res.json({ success: true, result: updatedUser });
	} else
		res
			.status(500)
			.json({ success: false, error: `unable to update user ${id}` });
});

module.exports = users;
