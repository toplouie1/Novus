const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || "us";
const ARTICLES_PER_PAGE = import.meta.env.VITE_ARTICLES_PER_PAGE || 20;

const handleResponse = async (response) => {
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch news");
	}
	return response.json();
};

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const getTopNews = async (page = 1) => {
	try {
		const response = await fetch(
			`${BASE_URL}/top-headlines?country=${DEFAULT_COUNTRY}&page=${page}&pageSize=${ARTICLES_PER_PAGE}&apiKey=${API_KEY}`
		);
		const data = await handleResponse(response);
		return {
			articles: data.articles.map((article) => ({
				...article,
				formattedDate: formatDate(article.publishedAt),
			})),
			totalResults: data.totalResults,
		};
	} catch (error) {
		console.error("Error fetching news:", error);
		throw error;
	}
};

export const getNewsByCategory = async (category, page = 1) => {
	try {
		const response = await fetch(
			`${BASE_URL}/top-headlines?country=${DEFAULT_COUNTRY}&category=${category}&page=${page}&pageSize=${ARTICLES_PER_PAGE}&apiKey=${API_KEY}`
		);
		const data = await handleResponse(response);
		return {
			articles: data.articles.map((article) => ({
				...article,
				formattedDate: formatDate(article.publishedAt),
			})),
			totalResults: data.totalResults,
		};
	} catch (error) {
		console.error("Error fetching category news:", error);
		throw error;
	}
};

export const searchNews = async (query, page = 1) => {
	try {
		const response = await fetch(
			`${BASE_URL}/everything?q=${query}&sortBy=relevancy&page=${page}&pageSize=${ARTICLES_PER_PAGE}&apiKey=${API_KEY}`
		);
		const data = await handleResponse(response);
		return {
			articles: data.articles.map((article) => ({
				...article,
				formattedDate: formatDate(article.publishedAt),
			})),
			totalResults: data.totalResults,
		};
	} catch (error) {
		console.error("Error searching news:", error);
		throw error;
	}
};
