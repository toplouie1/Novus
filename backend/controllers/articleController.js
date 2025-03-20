const express = require("express");

const { fetchArticles } = require("../news_feed/FetchArticles.js");
const { storeArticles } = require("../queries/articles.js");
const { generateEmbedding } = require("../news_feed/generateEmbedding.js");

const articles = express.Router();

articles.get("/", async (req, res) => {
	try {
		await fetchEmbedAndStoreArticles(req, res);
	} catch (error) {
		console.error("Error in route handler:", error.message);
		res
			.status(500)
			.json({ message: "Error processing request.", error: error.message });
	}
});

async function fetchEmbedAndStoreArticles(req, res) {
	const { country = "us", pageSize = 20, page = 1 } = req.query;

	try {
		const { articles: fetchedArticles } = await fetchArticles(
			page,
			country,
			pageSize
		);
		if (!fetchedArticles || fetchedArticles.length === 0) {
			return res.status(404).json({ message: "No articles fetched." });
		}
		console.log(`Fetched ${fetchedArticles.length} articles.`);
		const articlesToStore = fetchedArticles.map((article) => {
			const embedding = generateEmbedding(article.title);

			return {
				source_name: article.source.name,
				author: article.author,
				title: article.title,
				description: article.description,
				url: article.url,
				url_to_image: article.urlToImage,
				published_at: article.publishedAt,
				content: article.content,
				embedding: embedding,
			};
		});

		await storeArticles(articlesToStore);
		return res
			.status(200)
			.json({ message: "Articles successfully stored in the database." });
	} catch (error) {
		console.error(
			"Error in fetching, embedding, or storing articles:",
			error.message
		);
		return res
			.status(500)
			.json({ message: "Error processing articles.", error: error.message });
	}
}

module.exports = articles;
