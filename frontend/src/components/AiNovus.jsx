import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FeaturedArticle from "./FeaturedArticle";
import NewsGrid from "./NewsGrid";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Sidebar from "./Sidebar";

const AiNovus = () => {
	const [state, setState] = useState({
		articles: [],
		loading: true,
		error: null,
	});

	const API_URL = import.meta.env.VITE_API_URL;

	const fetchArticles = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, error: null, loading: true }));
			const { data } = await axios.get(`${API_URL}/articles`);
			setState((prev) => ({
				...prev,
				articles: data.articles || data.result || [],
				loading: false,
			}));
		} catch {
			setState((prev) => ({
				...prev,
				error: "Failed to load articles. Please try again later.",
				loading: false,
			}));
		}
	}, [API_URL]);

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	console.log("news articles backend", state.articles);

	return (
		<div className="news-layout">
			<main className="main-content">
				{state.error ? (
					<ErrorMessage message={state.error} onRetry={fetchArticles} />
				) : (
					<>
						{state.articles.length > 0 && (
							<FeaturedArticle article={state.articles[0]} />
						)}
						{state.articles.length > 1 && (
							<NewsGrid articles={state.articles.slice(1)} />
						)}
						{state.loading && <Loading />}
					</>
				)}
			</main>
			<Sidebar />
		</div>
	);
};

export default AiNovus;
