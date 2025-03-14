import { useState, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import "./css/App.css";
import Nav from "./components/Nav";
import Categories from "./components/Categories";
import FeaturedArticle from "./components/FeaturedArticle";
import NewsGrid from "./components/NewsGrid";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { getTopNews, getNewsByCategory, searchNews } from "./services/newsApi";
import { categories } from "./utils/constants";

function App() {
	const [state, setState] = useState({
		articles: [],
		selectedCategory: "general",
		loading: true,
		error: null,
		page: 1,
		hasMore: true,
		searchQuery: "",
	});

	const fetchNews = useCallback(
		async (reset = false) => {
			try {
				setState((prev) => ({ ...prev, error: null, loading: true }));

				const currentPage = reset ? 1 : state.page;
				let data;

				if (state.searchQuery) {
					data = await searchNews(state.searchQuery, currentPage);
				} else {
					data =
						state.selectedCategory === "general"
							? await getTopNews(currentPage)
							: await getNewsByCategory(state.selectedCategory, currentPage);
				}

				setState((prev) => ({
					...prev,
					articles: reset
						? data.articles
						: [...prev.articles, ...data.articles],
					hasMore: data.articles.length > 0,
					page: reset ? 1 : prev.page,
					loading: false,
				}));

				if (reset) window.scrollTo(0, 0);
			} catch (err) {
				setState((prev) => ({ ...prev, error: err.message, loading: false }));
			}
		},
		[state.selectedCategory, state.page, state.searchQuery]
	);

	useEffect(() => {
		fetchNews(true);
	}, [state.selectedCategory]);

	const handleSearch = useCallback(
		(query) => {
			setState((prev) => ({
				...prev,
				searchQuery: query,
				selectedCategory: "",
			}));
			fetchNews(true);
		},
		[fetchNews]
	);

	const handleLoadMore = useCallback(() => {
		if (!state.loading && state.hasMore) {
			setState((prev) => ({ ...prev, page: prev.page + 1 }));
		}
	}, [state.loading, state.hasMore]);

	useInfiniteScroll(handleLoadMore, state.hasMore, state.loading);

	return (
		<ThemeProvider>
			<BrowserRouter>
				<div className="app">
					<Nav onSearch={handleSearch} />
					<Categories
						categories={categories}
						selectedCategory={state.selectedCategory}
						onCategorySelect={(category) =>
							setState((prev) => ({ ...prev, selectedCategory: category }))
						}
					/>

					<div className="news-container">
						{state.error ? (
							<ErrorMessage
								message={state.error}
								onRetry={() => fetchNews(true)}
							/>
						) : (
							<>
								{state.articles.length > 0 && (
									<FeaturedArticle
										article={state.articles[0]}
										selectedCategory={state.selectedCategory}
									/>
								)}
								{state.articles.length > 1 && (
									<NewsGrid articles={state.articles.slice(1)} />
								)}
								{state.loading && <Loading />}
								{!state.loading &&
									!state.hasMore &&
									state.articles.length > 0 && (
										<div className="no-more">No more articles to load</div>
									)}
							</>
						)}
					</div>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
