require("dotenv").config();
const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = process.env.NEWS_API_BASE_URL;

async function fetchArticles(page, country, pageSize) {
	try {
		console.log("Fetching articles with the following parameters:");
		console.log(`Country: ${country}, Page: ${page}, PageSize: ${pageSize}`);
		console.log(`API Key: ${NEWS_API_KEY ? "Provided" : "Missing"}`);
		console.log(`Base URL: ${NEWS_API_BASE_URL}`);

		const url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

		const response = await axios.get(url);

		if (response.status !== 200 || !response.data.articles) {
			throw new Error(
				`Invalid response from News API: ${response.status} - ${response.statusText}`
			);
		}

		console.log(`Fetched ${response.data.articles.length} articles.`);

		console.log("data.articles ----- >>>>>", response.data.articles);
		console.log("data.totalResult ----- >>>>> ", response.data.totalResults);

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
