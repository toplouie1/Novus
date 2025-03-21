const { GoogleGenerativeAI } = require("@google/generative-ai");
const stopwords = require("stopwords-iso");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateEmbedding(text, retries = 3, delay = 1000) {
	if (!text || typeof text !== "string" || !text.trim()) {
		throw new Error("Invalid input: text must be a non-empty string.");
	}

	let cleanText = text
		.toLowerCase()
		.replace(/[^\w\s]/g, "")
		.split(/\s+/)
		.filter((word) => !stopwords["en"].includes(word))
		.join(" ")
		.trim();

	const truncatedText = cleanText.slice(0, 500);

	if (!truncatedText) return null;

	for (let i = 0; i < retries; i++) {
		try {
			const model = genAI.getGenerativeModel({ model: "embedding-001" });
			const response = await model.embedContent({
				content: {
					parts: [{ text: truncatedText }],
				},
				taskType: "RETRIEVAL_QUERY",
			});

			return response.embedding.values;
		} catch (error) {
			if (i === retries - 1)
				throw new Error("Failed to generate embedding after multiple retries.");

			if (error.response?.status === 429) {
				await new Promise((resolve) => setTimeout(resolve, delay));
				delay *= 2;
			} else {
				throw error;
			}
		}
	}
}

module.exports = { generateEmbedding };
