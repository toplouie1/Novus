import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./css/App.css";
import Nav from "./components/Nav";
import Categories from "./components/Categories";
import Home from "./components/Home";
import { useState, useCallback } from "react";
import AiNovus from "./components/aiNovus";

function App() {
	const [selectedCategory, setSelectedCategory] = useState("general");
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = useCallback((query) => {
		setSearchQuery(query);
		setSelectedCategory("");
	}, []);

	const handleCategorySelect = useCallback((category) => {
		setSelectedCategory(category);
		setSearchQuery("");
	}, []);

	return (
		<ThemeProvider>
			<div className="app">
				<Router>
					<Nav onSearch={handleSearch} />
					<Categories
						selectedCategory={selectedCategory}
						onCategorySelect={handleCategorySelect}
					/>
					<Routes>
						<Route
							path="/"
							element={
								<Home
									selectedCategory={selectedCategory}
									searchQuery={searchQuery}
								/>
							}
						/>
						<Route path="/aiNovus" element={<AiNovus />} />
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
