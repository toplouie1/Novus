const db = require("../db/dbConfig");

async function insertArticle(article) {
	try {
		await db.none(
			`INSERT INTO articles (source_name, author, title, description, url, url_to_image, embedding, published_at, content)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (url) DO NOTHING`,
			[
				article.source?.name || null,
				article.author || null,
				article.title,
				article.description || null,
				article.url,
				article.urlToImage || null,
				article.embedding,
				article.publishedAt || null,
				article.content || null,
			]
		);
		console.log(`Stored article: ${article.title}`);
	} catch (error) {
		console.error(`Failed to store article: ${article.title}`, error.message);
	}
}

async function storeArticles(articles) {
	for (const article of articles) {
		try {
			await insertArticle(article);
		} catch (error) {
			console.error(`Failed to store article: ${article.title}`, error.message);
		}
	}
}

module.exports = { storeArticles };
