const express = require("express");
const {
	getAllArticles,
	getArticleById,
	getRelevantArticles,
	getArticlesBySearch,
} = require("../queries/articles.js");
const { getSummaryAndFactCheck } = require("../queries/articlesSummary.js");

const articles = express.Router();

articles.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;

		const result = await getAllArticles(page, limit);
		res.status(200).json(result);
	} catch (error) {
		console.error("Error fetching articles:", error.message);
		res
			.status(500)
			.json({ message: "Error fetching articles", error: error.message });
	}
});

articles.get("/search", async (req, res) => {
	try {
		const { searchQuery, limit = 20 } = req.query;

		if (!searchQuery) {
			return res.status(400).json({ message: "Search query is required." });
		}
		const result = await getArticlesBySearch(searchQuery, limit);

		res.status(200).json(result);
	} catch (error) {
		console.error("Error fetching articles:", error.message);
		res
			.status(500)
			.json({ message: "Error fetching articles", error: error.message });
	}
});

articles.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const article = await getArticleById(id);

		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}

		res.status(200).json(article);
	} catch (error) {
		console.error(
			`Error fetching article with id ${req.params.id}:`,
			error.message
		);
		res
			.status(500)
			.json({ message: "Error fetching article", error: error.message });
	}
});

articles.get("/:id/relevant", async (req, res) => {
	try {
		const { id } = req.params;
		const { topK = 20 } = req.query;

		const relevantArticles = await getRelevantArticles(id, topK);

		if (relevantArticles.length === 0) {
			return res.status(404).json({ message: "No relevant articles found" });
		}

		res.status(200).json(relevantArticles);
	} catch (error) {
		console.error(
			`Error fetching relevant articles for user ${req.params.id}:`,
			error.message
		);
		res.status(500).json({
			message: "Error fetching relevant articles",
			error: error.message,
		});
	}
});

articles.post("/summarize", async (req, res) => {
	try {
		const { content, title, author, source_name } = req.body;

		if (!content) {
			return res.status(400).json({ error: "Article content is required." });
		}

		const article = { title, author, source_name, content };
		const result = await getSummaryAndFactCheck(article);
		res.json({ summary: result });
	} catch (error) {
		console.error("Error summarizing article:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = articles;
