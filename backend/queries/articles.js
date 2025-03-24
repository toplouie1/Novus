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

async function getAllArticles(page = 1, limit = 20) {
	try {
		const offset = (page - 1) * limit;
		const articles = await db.any(
			`SELECT id, source_name, author, title, description, url, url_to_image, published_at, content
       FROM articles
       ORDER BY published_at DESC
       LIMIT $1 OFFSET $2`,
			[limit, offset]
		);

		const totalCount = await db.one(`SELECT COUNT(*) FROM articles`);

		return {
			articles,
			pagination: {
				total: parseInt(totalCount.count),
				page,
				limit,
				pages: Math.ceil(parseInt(totalCount.count) / limit),
			},
		};
	} catch (error) {
		console.error("Error fetching articles:", error.message);
		throw error;
	}
}

async function getArticleById(id) {
	try {
		const article = await db.oneOrNone(
			`SELECT id, source_name, author, title, description, url, url_to_image, published_at, content
       FROM articles
       WHERE id = $1`,
			[id]
		);
		return article;
	} catch (error) {
		console.error(`Error fetching article with id ${id}:`, error.message);
		throw error;
	}
}

async function getRelevantArticles(id, topK = 20) {
	try {
		const articles = await db.any(
			`SELECT a.id, a.source_name, a.author, a.title, a.description, a.url, 
					a.url_to_image, a.published_at, a.content, 
					1 - (up.embedding <=> a.embedding) AS similarity
			FROM articles a
			JOIN user_preferences up ON up.user_id = $1
			WHERE a.embedding IS NOT NULL AND up.embedding IS NOT NULL
			ORDER BY up.embedding <=> a.embedding
			LIMIT $2`,
			[id, topK]
		);
		return articles;
	} catch (error) {
		console.error(
			`Error fetching relevant articles for user ${id}:`,
			error.message
		);
		throw error;
	}
}

module.exports = {
	storeArticles,
	getAllArticles,
	getArticleById,
	getRelevantArticles,
};
