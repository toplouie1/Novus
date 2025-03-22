import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FeaturedArticle from "./FeaturedArticle";
import NewsGrid from "./NewsGrid";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Sidebar from "./Sidebar";
import UserPreferences from "./UserPreferences";

const AiNovus = () => {
	const [state, setState] = useState({
		articles: [],
		filteredArticles: [],
		userInterests: [],
		availableCategories: [],
		generatingFeed: false,
		loading: true,
		error: null,
	});

	const API_URL = import.meta.env.VITE_API_URL;

	const fetchArticles = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, error: null, loading: true }));
			const { data } = await axios.get(`${API_URL}/articles`);
			const articles = data.articles || data.result || [];

			setState((prev) => {
				const filtered =
					prev.userInterests.length > 0
						? filterArticlesByInterests(articles, prev.userInterests)
						: articles;

				return {
					...prev,
					articles: articles,
					filteredArticles: filtered,
					loading: false,
				};
			});
		} catch (error) {
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

	const filterArticlesByInterests = (articles, interests) => {
		if (!interests.length) return articles;

		return articles.filter((article) => {
			const articleCategory = article.category || "";
			const articleTags = article.tags || [];

			return (
				interests.includes(articleCategory) ||
				articleTags.some((tag) => interests.includes(tag))
			);
		});
	};

	const handleGenerateInterests = async (selectedInterests) => {
		if (!selectedInterests.length) return;

		try {
			setState((prev) => ({ ...prev, generatingFeed: true, error: null }));

			const { data } = await axios.post(`${API_URL}/articles/custom-feed`, {
				interests: selectedInterests,
			});

			const customArticles = data.articles || data.result || [];

			setState((prev) => ({
				...prev,
				filteredArticles: customArticles,
				generatingFeed: false,
			}));
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: "Failed to generate custom feed. Please try again.",
				generatingFeed: false,
			}));
		}
	};

	// Determine which articles to display
	const displayedArticles =
		state.filteredArticles.length > 0 ? state.filteredArticles : state.articles;

	return (
		<div className="news-layout">
			<main className="main-content">
				<div className="mb-6">
					<UserPreferences onGenerateInterests={handleGenerateInterests} />
				</div>

				{state.error ? (
					<ErrorMessage message={state.error} onRetry={fetchArticles} />
				) : (
					<>
						{state.generatingFeed && (
							<div className="p-4 mb-4 bg-blue-50 text-blue-800 rounded">
								<div className="flex items-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									<span>Generating your personalized feed...</span>
								</div>
							</div>
						)}

						{displayedArticles.length > 0 && (
							<FeaturedArticle article={displayedArticles[0]} />
						)}
						{displayedArticles.length > 1 && (
							<NewsGrid articles={displayedArticles.slice(1)} />
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
