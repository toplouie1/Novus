require("dotenv").config();
const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = process.env.NEWS_API_BASE_URL;

async function fetchArticles(page, country, pageSize) {
	try {
		const url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const everythingUrl = `${NEWS_API_BASE_URL}/everything?q=finance OR sports&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const topHeadlinesUrl = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const sportsUrl = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&category=sports&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const financeUrl = `${NEWS_API_BASE_URL}/top-headlines?category=business&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const technologyUrl = `${NEWS_API_BASE_URL}/top-headlines?category=technology&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const politicsUrl = `${NEWS_API_BASE_URL}/everything?q=politics OR government OR election&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const gamesUrl = `${NEWS_API_BASE_URL}/everything?q=gaming OR video games OR esports&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const cartoonsUrl = `${NEWS_API_BASE_URL}/everything?q=cartoons OR animation OR anime&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const trendingUrl = `${NEWS_API_BASE_URL}/everything?q=trending OR viral OR breaking news&language=en&sortBy=popularity&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const scienceUrl = `${NEWS_API_BASE_URL}/top-headlines?category=science&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const healthUrl = `${NEWS_API_BASE_URL}/top-headlines?category=health&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const entertainmentUrl = `${NEWS_API_BASE_URL}/top-headlines?category=entertainment&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const businessUrl = `${NEWS_API_BASE_URL}/top-headlines?category=business&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const worldNewsUrl = `${NEWS_API_BASE_URL}/everything?q=world news OR international&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
		// const climateUrl = `${NEWS_API_BASE_URL}/everything?q=climate OR environment OR global warming&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

		const response = await axios.get(url);

		if (response.status !== 200 || !response.data.articles) {
			throw new Error(
				`Invalid response from News API: ${response.status} - ${response.statusText}`
			);
		}
		console.log(`Fetched ${response.data.articles.length} articles.`);

		return { articles: response.data.articles };
	} catch (error) {
		console.error("Error fetching articles from News API:", error.message);
		if (error.response) {
			console.error("Response data:", error.response.data);
			console.error("Response status:", error.response.status);
		}
		return { articles: [], totalResults: 0 };
	}
}

module.exports = { fetchArticles };
