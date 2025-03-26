import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

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

export const summarizeArticle = async (article) => {
	try {
		const requestData = {
			content: article.content,
			title: article.title,
			author: article.author,
			source_name: article.source_name,
		};
		const response = await axios.post(
			`${API_URL}/articles/summarize`,
			requestData
		);

		if (response.data && response.data.summary) {
			return response.data.summary;
		} else {
			return { error: "Invalid response format." };
		}
	} catch (error) {
		console.error("Error during summarization:", error);
		return { error: "Failed to summarize. Try again." };
	}
};
