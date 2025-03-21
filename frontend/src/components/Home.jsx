import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import FeaturedArticle from "./FeaturedArticle";
import NewsGrid from "./NewsGrid";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { getTopNews, getNewsByCategory, searchNews } from "../services/newsApi";
import Sidebar from "./Sidebar";

const Home = ({ selectedCategory, searchQuery }) => {
	const [state, setState] = useState({
		articles: [],
		loading: true,
		error: null,
		page: 1,
		hasMore: true,
	});

	const fetchNews = useCallback(
		async (reset = false) => {
			try {
				setState((prev) => ({ ...prev, error: null, loading: true }));

				const currentPage = reset ? 1 : state.page;
				let data;

				if (searchQuery) {
					data = await searchNews(searchQuery, currentPage);
				} else {
					data =
						selectedCategory === "general"
							? await getTopNews(currentPage)
							: await getNewsByCategory(selectedCategory, currentPage);
				}

				setState((prev) => ({
					...prev,
					articles: reset
						? data.articles
						: [...prev.articles, ...data.articles],
					hasMore: data.articles.length > 0,
					page: reset ? 2 : prev.page + 1,
					loading: false,
				}));

				if (reset) window.scrollTo(0, 0);
			} catch (err) {
				setState((prev) => ({ ...prev, error: err.message, loading: false }));
			}
		},
		[selectedCategory, searchQuery, state.page]
	);

	// Fetch news when category or search query changes
	useEffect(() => {
		fetchNews(true);
	}, [selectedCategory, searchQuery]);

	const handleLoadMore = useCallback(() => {
		if (!state.loading && state.hasMore) {
			fetchNews(false);
		}
	}, [state.loading, state.hasMore, fetchNews]);

	useInfiniteScroll(handleLoadMore, state.hasMore, state.loading);

	return (
		<div className="news-layout">
			<main className="main-content">
				{state.error ? (
					<ErrorMessage message={state.error} onRetry={() => fetchNews(true)} />
				) : (
					<>
						{state.articles.length > 0 && (
							<FeaturedArticle
								article={state.articles[0]}
								selectedCategory={selectedCategory}
							/>
						)}
						{state.articles.length > 1 && (
							<NewsGrid articles={state.articles.slice(1)} />
						)}
						{state.loading && <Loading />}
						{!state.loading && !state.hasMore && state.articles.length > 0 && (
							<div className="no-more">No more articles to load</div>
						)}
					</>
				)}
			</main>
			<Sidebar />
		</div>
	);
};

export default Home;
