const express = require("express");
const { getAllArticles, getArticleById } = require("../queries/articles.js");

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

module.exports = articles;
