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
	const query = `
        INSERT INTO user_preferences (user_id, preferred_categories, embedding)
        VALUES ($1, $2::TEXT[], $3)
        ON CONFLICT (user_id) DO UPDATE
        SET preferred_categories = EXCLUDED.preferred_categories,
            embedding = EXCLUDED.embedding
        RETURNING *;
    `;

	const formattedCategories = `{${preferredCategories.join(",")}}`;

	const values = [userId, formattedCategories, embedding];

	try {
		const result = await db.query(query, values);
		return result.rows;
	} catch (error) {
		console.error("Error updating user preferences:", error);
		throw error;
	}
};

module.exports = {
	getUserPreferences,
	updateUserPreferences,
	updateUserCategoriesAndEmbedding,
};
