import React, { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../services/novusAi";

import FeaturedArticle from "./FeaturedArticle";
import NewsGrid from "./NewsGrid";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Sidebar from "./Sidebar";
import UserPreferences from "./UserPreferences";

const AiNovus = () => {
	const [state, setState] = useState({
		articles: [],
		loading: true,
		error: null,
	});

	const API_URL = import.meta.env.VITE_API_URL;

	const fetchArticlesData = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, error: null, loading: true }));
			const articles = await fetchArticles(API_URL);

			setState((prev) => ({
				...prev,
				articles,
				loading: false,
			}));
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: "Failed to load articles. Please try again later.",
				loading: false,
			}));
		}
	}, [API_URL]);

	useEffect(() => {
		fetchArticlesData();
	}, [fetchArticlesData]);

	return (
		<div className="news-layout">
			<main className="main-content">
				<div className="mb-6">
					<UserPreferences />
				</div>

				{state.error ? (
					<ErrorMessage message={state.error} onRetry={fetchArticlesData} />
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
