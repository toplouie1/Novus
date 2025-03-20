const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbedding(text, retries = 5, delayTime = 2000) {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await openai.embeddings.create({
				model: "text-embedding-3-small",
				input: text,
			});

			if (Array.isArray(text)) {
				return response.data.map((item) => item.embedding);
			} else {
				return response.data[0].embedding;
			}
		} catch (error) {
			const status =
				error.status || (error.response ? error.response.status : null);
			if (status === 429) {
				console.error(
					`Rate limit hit (attempt ${attempt}/${retries}): ${error.message}`
				);
				const retryAfter = error.headers?.["retry-after"] || delayTime;
				const waitTime =
					typeof retryAfter === "string"
						? parseInt(retryAfter) * 1000
						: delayTime;
				if (attempt < retries) {
					console.log(`Retrying in ${waitTime}ms...`);
					await new Promise((resolve) => setTimeout(resolve, waitTime));
					delayTime *= 1.5 * (0.9 + Math.random() * 0.2);
				} else {
					console.error("Exceeded maximum retries. Skipping this embedding.");
					return null;
				}
			} else {
				console.error(`Error generating embedding (${status}):`, error.message);
				if (status >= 500 && status < 600 && attempt < retries) {
					console.log(`Server error. Retrying in ${delayTime}ms...`);
					await new Promise((resolve) => setTimeout(resolve, delayTime));
					delayTime *= 2;
				} else {
					return null;
				}
			}
		}
	}
	return null;
}

module.exports = { generateEmbedding };
