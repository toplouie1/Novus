const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const trimContent = (content, maxLength = 4000) => {
	if (content.length <= maxLength) return content;
	return content.substring(0, maxLength) + "...";
};

const getSummaryAndFactCheck = async (article) => {
	const {
		title = "Unknown Title",
		author = "Unknown Author",
		source_name = "Unknown Source",
		content,
	} = article;

	if (!content) {
		throw new Error("Content is required for summarization.");
	}

	const trimmedContent = trimContent(content);

	const prompt = `
	You are an AI assistant that generates concise and professional summaries and fact-checks articles. 
	
	Given the following article:
	Title: ${title}
	Author: ${author}
	Source: ${source_name}
	Content: ${trimmedContent}
	
	Your task:
	1. Generate a **professional 2-3 sentence summary** of the article.
	2. **Fact-check key claims** and assess their credibility.
	3. Provide a **truthfulness rating (1-5 stars)** based on accuracy.
	4. Include a **brief explanation (1-2 sentences)** of the rating.
	
	Return the response in **valid JSON format** with the following structure:
	\`\`\`json
	{
	  "summary": "Concise, professional summary here.",
	  "rating": X, // (1-5 stars)
	  "justification": "Brief explanation of the rating."
	}
	\`\`\`
	Ensure the response is **pure JSON** with no extra text.
	`;

	try {
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const result = await model.generateContent(prompt);
		const text = await result.response.text();

		return text || "No summary available.";
	} catch (error) {
		console.error("Error calling Gemini API:", error.message);
		return "Error processing the request.";
	}
};

module.exports = { getSummaryAndFactCheck };
