import React, { useState, useEffect, useCallback } from "react";
import FeaturedArticle from "./FeaturedArticle";
import NewsGrid from "./NewsGrid";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { getNewsByCategory, searchNews } from "../services/newsApi";
import { fetchArticles } from "../services/novusAi";
import Sidebar from "./Sidebar";
const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ selectedCategory, searchQuery }) => {
	const [state, setState] = useState({
		articles: [],
		loading: true,
		error: null,
		hasMore: true,
	});

	let validArticleWithImage = 0;
	if (state.articles.length > 0 && state.articles[0]?.urlToImage) {
		validArticleWithImage = 0;
	} else if (
		state.articles.length > 0 &&
		state.articles[state.articles.length - 1]?.urlToImage
	) {
		validArticleWithImage = state.articles.length - 1;
	} else {
		validArticleWithImage = 5;
	}

	const fetchNews = useCallback(
		async (reset = false) => {
			try {
				setState((prev) => ({ ...prev, error: null, loading: true }));
				let data;

				if (searchQuery) {
					data = await searchNews(searchQuery);
				} else {
					data =
						selectedCategory === "general"
							? { articles: await fetchArticles(API_URL) }
							: await getNewsByCategory(selectedCategory);
				}

				setState((prev) => ({
					...prev,
					articles: reset
						? data.articles || []
						: [...prev.articles, ...(data.articles || [])],
					hasMore: data?.articles?.length > 0,
					loading: false,
				}));

				if (reset) window.scrollTo(0, 0);
			} catch (err) {
				setState((prev) => ({ ...prev, error: err.message, loading: false }));
			}
		},
		[selectedCategory, searchQuery]
	);

	useEffect(() => {
		fetchNews(true);
	}, [selectedCategory, searchQuery, fetchNews]);

	return (
		<div className="news-layout">
			<main className="main-content">
				{state.error ? (
					<ErrorMessage message={state.error} onRetry={() => fetchNews(true)} />
				) : (
					<>
						{state.articles.length > 0 && (
							<FeaturedArticle
								article={state.articles[validArticleWithImage]}
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
