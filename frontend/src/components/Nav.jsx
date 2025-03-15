import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../css/Nav.css";

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
					<img src="/novus-logo.svg" alt="Novus" className="logo-image" />
				</Link>
			</div>

			<div className="nav-center">
				<form className="search-container" onSubmit={handleSearch}>
					<input
						type="text"
						className="search-input"
						placeholder="Search news..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						disabled={isSearching}
					/>
					<button
						type="submit"
						className="search-button"
						disabled={isSearching}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
					</button>
				</form>
			</div>

			<div className="nav-right">
				<button className="theme-toggle" onClick={toggleTheme}>
					{isDark ? (
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="5" />
							<line x1="12" y1="1" x2="12" y2="3" />
							<line x1="12" y1="21" x2="12" y2="23" />
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
							<line x1="1" y1="12" x2="3" y2="12" />
							<line x1="21" y1="12" x2="23" y2="12" />
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
						</svg>
					) : (
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
						</svg>
					)}
				</button>
			</div>
		</nav>
	);
};

export default Nav;
