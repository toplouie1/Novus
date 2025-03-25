import { useState } from "react";
import axios from "axios";
import "../css/Summarize.css";

const API_URL = import.meta.env.VITE_API_URL;

const SummarizeButton = ({ article }) => {
	const [summaryData, setSummaryData] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSummarize = async () => {
		setLoading(true);
		try {
			const requestData = {
				content: article.content,
				title: article.title,
				author: article.author,
				source_name: article.source_name,
			};
			const response = await axios.post(
				`${API_URL}/articles/summarize`,
				requestData
			);

			if (response.data && response.data.summary) {
				setSummaryData(response.data.summary);
			} else {
				setSummaryData({ error: "Invalid response format." });
			}
		} catch (error) {
			console.error("Error during summarization:", error);
			setSummaryData({ error: "Failed to summarize. Try again." });
		}
		setLoading(false);
	};
	const summaryText = summaryData?.summary || "No summary available.";
	const rating = summaryData?.rating || 0;
	const justification =
		summaryData?.justification || "No justification available.";

	return (
		<div className="summarize-container">
			<button
				onClick={handleSummarize}
				disabled={loading}
				className="summarize-button"
			>
				{loading ? "Summarizing..." : "Summarize"}
			</button>

			{summaryData && (
				<div className="summary-box">
					{summaryData.error ? (
						<p className="error">{summaryData.error}</p>
					) : (
						<>
							<p>
								<strong>Summary:</strong> {summaryText}
							</p>
							<p className="rating">
								<strong>Rating:</strong>{" "}
								{"★".repeat(rating) + "☆".repeat(5 - rating)}
							</p>
							<p>
								<strong>Why:</strong> {justification}
							</p>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SummarizeButton;
