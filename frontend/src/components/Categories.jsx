import React, { useState, useEffect } from "react";
import { categories } from "../utils/constants";
import AiNovusButton from "./AiNovusButton";
import { useLocation } from "react-router-dom";

const Categories = ({ selectedCategory, onCategorySelect }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("userId")
	);

	useEffect(() => {
		const checkLoginStatus = () => {
			const loggedInStatus = !!localStorage.getItem("userId");
			setIsLoggedIn(loggedInStatus);
		};
		window.addEventListener("loginStateChanged", checkLoginStatus);
		return () => {
			window.removeEventListener("loginStateChanged", checkLoginStatus);
		};
	}, []);

	const location = useLocation();

	return (
		<div className="categories">
			{isLoggedIn && <AiNovusButton />}
			{location.pathname !== "/aiNovus" &&
				categories.map((category) => (
					<div
						key={category.id}
						className={`category ${
							selectedCategory === category.id ? "active" : ""
						}`}
						onClick={() => onCategorySelect(category.id)}
					>
						{category.label}
					</div>
				))}
		</div>
	);
};

export default Categories;
