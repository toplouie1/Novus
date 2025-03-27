import axios from "axios";

const ARTICLES_PER_PAGE = import.meta.env.VITE_ARTICLES_PER_PAGE || 20;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const handleResponse = (response) => {
	return response.data;
};

export const getTopNews = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/articles/search`, {
			params: {
				searchQuery: "headlines",
				limit: ARTICLES_PER_PAGE,
			},
		});
		const data = handleResponse(response);

		return {
			articles: data.map((article) => ({
				...article,
				formattedDate: formatDate(article.published_at),
			})),
			totalResults: data.length,
		};
	} catch (error) {
		console.error("Error fetching top news:", error);
		throw error;
	}
};

export const getNewsByCategory = async (category) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/articles/search`, {
			params: {
				searchQuery: category,
				limit: ARTICLES_PER_PAGE,
			},
		});
		const data = handleResponse(response);

		return {
			articles: data.map((article) => ({
				...article,
				formattedDate: formatDate(article.published_at),
			})),
			totalResults: data.length,
		};
	} catch (error) {
		console.error("Error fetching category news:", error);
		throw error;
	}
};

export const searchNews = async (query) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/articles/search`, {
			params: {
				searchQuery: query,
				limit: ARTICLES_PER_PAGE,
			},
		});
		const data = handleResponse(response);

		return {
			articles: data.map((article) => ({
				...article,
				formattedDate: formatDate(article.published_at),
			})),
			totalResults: data.length,
		};
	} catch (error) {
		console.error("Error searching news:", error);
		throw error;
	}
};
