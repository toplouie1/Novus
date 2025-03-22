const { fetchArticles } = require("./FetchArticles.js");
const { generateEmbedding } = require("../embedding/generateEmbedding.js");
const { storeArticles } = require("../queries/articles.js");

async function fetchEmbedAndStoreArticles(country, pageSize, page) {
	try {
		console.log(
			`Fetching articles for country: ${country}, page: ${page}, pageSize: ${pageSize}`
		);

		const result = await fetchArticles(page, country, pageSize);

		if (!result.articles || result.articles.length === 0) {
			console.log("No articles found or API returned empty result.");
			return;
		}

		console.log(
			`Processing ${result.articles.length} articles for embeddings...`
		);

		const articlesWithEmbeddings = [];

		for (const article of result.articles) {
			const textToEmbed = `${article.title || ""} ${
				article.description || ""
			}`.trim();

			if (textToEmbed) {
				try {
					console.log(`Generating embedding for article: ${article.title}`);
					const embedding = await generateEmbedding(textToEmbed);

					if (embedding) {
						articlesWithEmbeddings.push({
							...article,
							embedding,
							urlToImage: article.urlToImage,
						});
					} else {
						console.warn(
							`Skipping article due to embedding failure: ${article.title}`
						);
					}
				} catch (error) {
					console.error(
						`Error generating embedding for article: ${article.title}`,
						error.message
					);
				}
			} else {
				console.warn(
					`Skipping article with no content to embed: ${article.title}`
				);
			}
		}

		console.log(
			`Successfully generated embeddings for ${articlesWithEmbeddings.length} articles.`
		);

		if (articlesWithEmbeddings.length > 0) {
			await storeArticles(articlesWithEmbeddings);
			console.log(
				`Articles stored in database: ${articlesWithEmbeddings.length}`
			);
		} else {
			console.log("No articles to store after processing.");
		}
	} catch (error) {
		console.error("Error in fetchEmbedAndStoreArticles:", error.message);
		throw error;
	}
}

module.exports = { fetchEmbedAndStoreArticles };
