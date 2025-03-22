const express = require("express");
const {
	getUserPreferences,
	updateUserPreferences,
	updateUserCategoriesAndEmbedding,
} = require("../queries/userPreference.js");
const { generateEmbedding } = require("../embedding/generateEmbedding.js");

const userPreferences = express.Router();

userPreferences.get("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const preferences = await getUserPreferences(userId);

		if (!preferences) {
			return res.status(404).json({ message: "User preferences not found" });
		}

		res.status(200).json(preferences);
	} catch (error) {
		console.error(
			`Error fetching preferences for user ${req.params.userId}:`,
			error.message
		);
		res.status(500).json({
			message: "Error fetching user preferences",
			error: error.message,
		});
	}
});

userPreferences.put("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const { preferredCategories, preferredSources } = req.body;

		const combinedPreferences = [
			...preferredCategories,
			...preferredSources,
		].join(" ");
		const embedding = await generateEmbedding(combinedPreferences);

		const updatedPreferences = await updateUserPreferences(
			userId,
			preferredCategories,
			preferredSources,
			embedding
		);

		res.status(200).json(updatedPreferences);
	} catch (error) {
		console.error(
			`Error updating preferences for user ${req.params.userId}:`,
			error.message
		);
		res.status(500).json({
			message: "Error updating user preferences",
			error: error.message,
		});
	}
});

userPreferences.patch("/:userId/categories", async (req, res) => {
	try {
		const { userId } = req.params;
		const { preferredCategories } = req.body;
		const embedding = await generateEmbedding(preferredCategories.join(" "));

		const updatedPreferences = await updateUserCategoriesAndEmbedding(
			userId,
			preferredCategories,
			embedding
		);

		res.status(200).json(updatedPreferences);
	} catch (error) {
		console.error(
			`Error updating categories for user ${req.params.userId}:`,
			error.message
		);
		res.status(500).json({
			message: "Error updating user categories",
			error: error.message,
		});
	}
});

module.exports = userPreferences;
