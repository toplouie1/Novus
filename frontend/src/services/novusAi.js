import axios from "axios";

export const fetchArticles = async (API_URL) => {
	const { data } = await axios.get(`${API_URL}/articles`);
	return data.articles || data.result || [];
};

export const updateUserCategories = async (
	API_URL,
	userId,
	preferredCategories
) => {
	const categoryIds = preferredCategories.map((category) => category.id);
	const { data } = await axios.patch(
		`${API_URL}/preferences/${userId}/categories`,
		{ preferredCategories: categoryIds }
	);
	return data.preferred_categories;
};
