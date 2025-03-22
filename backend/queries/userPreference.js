const db = require("../db/dbConfig.js");

const getUserPreferences = async (userId) => {
	try {
		const userPreferences = await db.one(
			"SELECT preferred_categories FROM user_preferences WHERE user_id = $1",
			[userId]
		);
		return userPreferences;
	} catch (error) {
		return error;
	}
};

const updateUserPreferences = async (
	userId,
	preferredCategories,
	preferredSources,
	embedding
) => {
	try {
		const updatedPreferences = await db.one(
			`INSERT INTO user_preferences (user_id, preferred_categories, preferred_sources, embedding)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (user_id)
             DO UPDATE SET 
                 preferred_categories = $2,
                 preferred_sources = $3,
                 embedding = $4
             RETURNING *`,
			[userId, preferredCategories, preferredSources, embedding]
		);
		return updatedPreferences;
	} catch (error) {
		return error;
	}
};

const updateUserCategoriesAndEmbedding = async (
	userId,
	preferredCategories,
	embedding
) => {
	try {
		const updatedPreferences = await db.one(
			`UPDATE user_preferences
             SET preferred_categories = $2,
                 embedding = $3
             WHERE user_id = $1
             RETURNING *`,
			[userId, preferredCategories, embedding]
		);
		return updatedPreferences;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getUserPreferences,
	updateUserPreferences,
	updateUserCategoriesAndEmbedding,
};
