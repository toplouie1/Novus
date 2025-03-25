import axios from "axios";

export const fetchArticles = async (apiUrl) => {
	try {
		const response = await axios.get(`${apiUrl}/articles`);
		return response.data.articles || [];
	} catch (error) {
		console.error("Error fetching articles:", error.message);
		throw error;
	}
};

export const updateUserCategories = async (apiUrl, userId, preferences) => {
	const interest = preferences.map((preference) => preference.name);
	try {
		await axios.patch(`${apiUrl}/preferences/${userId}/categories`, {
			preferredCategories: interest,
		});
	} catch (error) {
		console.error("Error updating user categories:", error.message);
		throw error;
	}
};
