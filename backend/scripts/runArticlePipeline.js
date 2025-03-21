const {
	fetchEmbedAndStoreArticles,
} = require("../news_feed/embed_store_articles.js");

(async () => {
	try {
		console.log("Starting the article pipeline...");
		await fetchEmbedAndStoreArticles("us", 30, 1);
		console.log("Article pipeline completed successfully.");
	} catch (error) {
		console.error("Error running the article pipeline:", error.message);
	}
})();
