const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const trimContent = (content, maxLength = 4000) => {
	if (content.length <= maxLength) return content;
	return content.substring(0, maxLength) + "...";
};

const getSummaryAndFactCheck = async (article) => {
	const { title, author, source_name, content } = article;

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

		const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
		const jsonString = jsonMatch ? jsonMatch[1] : text;

		let parsedResponse;
		try {
			parsedResponse = JSON.parse(jsonString);
		} catch (parseError) {
			console.error("Failed to parse JSON:", parseError);
			return { error: "Invalid JSON format received from AI response." };
		}

		if (
			!parsedResponse.summary ||
			parsedResponse.rating === undefined ||
			!parsedResponse.justification
		) {
			return { error: "Incomplete AI response received." };
		}

		return parsedResponse;
	} catch (error) {
		console.error("Error calling Gemini API:", error.message);
		return { error: "Error processing the request." };
	}
};

module.exports = { getSummaryAndFactCheck };
