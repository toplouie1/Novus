import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AuthModal from "./Avatar";
import "../css/Nav.css";
import { SEARCH_PLACEHOLDER, LOGO_SRC } from "../utils/constants";
import { SunIcon, MoonIcon, SearchIcon } from "../utils/icons.jsx";

const Nav = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const { isDark, toggleTheme } = useTheme();

	const handleSearch = useCallback(
		(e) => {
			e.preventDefault();
			if (!searchQuery.trim()) return;

			setIsSearching(true);
			try {
				onSearch(searchQuery);
			} finally {
				setIsSearching(false);
			}
		},
		[searchQuery, onSearch]
	);

	return (
		<nav className="navbar">
			<div className="nav-left">
				<Link to="/" className="logo">
					<img src={LOGO_SRC} alt="Novus" className="logo-image" />
				</Link>
			</div>

			<div className="nav-center">
				<form className="search-container" onSubmit={handleSearch}>
					<input
						type="text"
						className="search-input"
						placeholder={SEARCH_PLACEHOLDER}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						disabled={isSearching}
					/>
					<button
						type="submit"
						className="search-button"
						disabled={isSearching}
					>
						{SearchIcon}
					</button>
				</form>
			</div>

			<div className="nav-right">
				<AuthModal />
				<button className="theme-toggle" onClick={toggleTheme}>
					{isDark ? SunIcon : MoonIcon}
				</button>
			</div>
		</nav>
	);
};

export default Nav;
