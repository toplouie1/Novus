import React, { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../services/novusAi";
import { API_URL, getUserId } from "../utils/constants";

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

	const userId = getUserId();

	const fetchArticlesData = useCallback(
		async (preferences = []) => {
			try {
				setState((prev) => ({ ...prev, error: null, loading: true }));
				let articles = await fetchArticles(API_URL);

				if (preferences.length > 0) {
					const response = await fetch(
						`${API_URL}/articles/${userId}/relevant`
					);
					if (response.ok) {
						articles = await response.json();
					} else {
						throw new Error("Failed to fetch relevant articles");
					}
				}

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
		},
		[API_URL, userId]
	);

	useEffect(() => {
		fetchArticlesData();
	}, [fetchArticlesData]);

	const handleUpdateUserCategories = async (preferences) => {
		fetchArticlesData(preferences);
	};

	return (
		<div className="news-layout">
			<main className="main-content">
				<div className="mb-6">
					<UserPreferences onUpdateCategories={handleUpdateUserCategories} />
				</div>

				{state.error ? (
					<ErrorMessage
						message={state.error}
						onRetry={() => fetchArticlesData()}
					/>
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
