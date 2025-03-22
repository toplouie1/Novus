import React, { useState, useEffect } from "react";
import axios from "axios";

const AiNovus = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/articles`);
				setArticles(data.articles || data.result || []);
			} catch {
				setError("Failed to load articles. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchArticles();
	}, [API_URL]);

	if (loading)
		return (
			<div className="ai-novus-loading">
				<p>Loading articles...</p>
			</div>
		);
	if (error) return <div className="ai-novus-error">{error}</div>;

	return (
		<div className="ai-novus-container">
			<header>
				<h1>AI Novus</h1>
				<p>The Latest in Artificial Intelligence News</p>
			</header>
			{articles.length ? (
				<div className="ai-novus-grid">
					{articles.map(
						({
							id,
							url_to_image,
							source_name,
							title,
							author,
							published_at,
							description,
							content,
							url,
						}) => (
							<article key={id} className="ai-novus-card">
								<div
									className="ai-novus-image"
									style={{ backgroundImage: `url(${url_to_image || ""})` }}
								>
									<div className="ai-novus-source-badge">{source_name}</div>
								</div>
								<div className="ai-novus-card-body">
									<h2>{title}</h2>
									<p>
										{author || "Unknown Author"} -{" "}
										{new Date(published_at).toLocaleDateString()}
									</p>
									<p>{description}</p>
									<p>{content?.slice(0, 150) || ""}...</p>
									<a href={url} target="_blank" rel="noopener noreferrer">
										Read Full Article
									</a>
								</div>
							</article>
						)
					)}
				</div>
			) : (
				<p>No articles found.</p>
			)}
		</div>
	);
};

export default AiNovus;
