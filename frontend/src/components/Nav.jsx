import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		console.log("Searching for:", searchQuery);
	};

	return (
		<nav className="navbar">
			<div className="nav-left">
				<Link to="/" className="logo">
					Novus
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
					/>
					<button type="submit" className="search-button">
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
				<button className="auth-button">Sign In</button>
			</div>
		</nav>
	);
};

export default Nav;
