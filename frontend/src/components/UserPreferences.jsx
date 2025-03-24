import React, { useState, useEffect } from "react";
import "../css/UserPreferences.css";
import { updateUserCategories } from "../services/novusAi";

const UserPreferences = ({ onUpdateCategories }) => {
	const [savedInterests, setSavedInterests] = useState([]);
	const [customInterest, setCustomInterest] = useState("");
	const [customColor, setCustomColor] = useState("blue");
	const [availableInterests, setAvailableInterests] = useState([
		{ id: "tech", name: "Technology", color: "blue" },
		{ id: "business", name: "Business", color: "green" },
		{ id: "health", name: "Health", color: "teal" },
		{ id: "entertainment", name: "Entertainment", color: "purple" },
		{ id: "sports", name: "Sports", color: "red" },
		{ id: "science", name: "Science", color: "indigo" },
		{ id: "politics", name: "Politics", color: "orange" },
		{ id: "travel", name: "Travel", color: "pink" },
		{ id: "food", name: "Food", color: "yellow" },
		{ id: "fashion", name: "Fashion", color: "gray" },
	]);

	const colorOptions = [
		{ value: "blue", label: "Blue" },
		{ value: "green", label: "Green" },
		{ value: "red", label: "Red" },
		{ value: "yellow", label: "Yellow" },
		{ value: "purple", label: "Purple" },
		{ value: "pink", label: "Pink" },
		{ value: "indigo", label: "Indigo" },
		{ value: "teal", label: "Teal" },
		{ value: "orange", label: "Orange" },
		{ value: "gray", label: "Gray" },
	];

	useEffect(() => {
		const saved = localStorage.getItem("savedInterestCollection");
		if (saved) {
			setSavedInterests(JSON.parse(saved));
		}
	}, []);

	const API_URL = import.meta.env.VITE_API_URL;
	const userId = localStorage.getItem("userId");

	const handleUpdateUserCategories = async () => {
		try {
			await updateUserCategories(API_URL, userId, savedInterests);
			const interestName = savedInterests.map((category) => category.name);
			onUpdateCategories(interestName);
		} catch (error) {
			console.error("Error handling update:", error);
		}
	};

	const saveInterest = (interest) => {
		setSavedInterests((prev) => {
			if (prev.some((item) => item.id === interest.id)) {
				return prev;
			}

			const updated = [...prev, interest];
			localStorage.setItem("savedInterestCollection", JSON.stringify(updated));
			return updated;
		});
	};

	const removeInterest = (interestId) => {
		setSavedInterests((prev) => {
			const updated = prev.filter((item) => item.id !== interestId);
			localStorage.setItem("savedInterestCollection", JSON.stringify(updated));
			return updated;
		});
	};

	const handleAddCustomInterest = (e) => {
		e.preventDefault();
		if (customInterest.trim() === "") return;

		const newInterest = {
			id: `custom-${Date.now()}`,
			name: customInterest.trim(),
			color: customColor,
			isCustom: true,
		};

		setAvailableInterests((prev) => [...prev, newInterest]);
		saveInterest(newInterest);
		setCustomInterest("");
	};

	const handleGenerate = () => {
		const interestIds = savedInterests.map((interest) => interest.id);
		handleUpdateUserCategories(interestIds);
	};

	const getColorClass = (colorName) => {
		const colorMap = {
			blue: "interest-button-blue",
			green: "interest-button-green",
			red: "interest-button-red",
			yellow: "interest-button-yellow",
			purple: "interest-button-purple",
			pink: "interest-button-pink",
			indigo: "interest-button-indigo",
			teal: "interest-button-teal",
			orange: "interest-button-orange",
			gray: "interest-button-gray",
		};

		return colorMap[colorName] || "interest-button-blue";
	};

	return (
		<div className="interest-collector">
			<p className="instruction-text">
				Select interests to create your custom news feed:
			</p>

			<div className="available-interests">
				{availableInterests.map((interest) => (
					<button
						key={interest.id}
						onClick={() => saveInterest(interest)}
						className={`interest-button ${getColorClass(interest.color)}`}
					>
						{interest.name}
					</button>
				))}
			</div>

			<div className="custom-interest-container">
				<h4 className="custom-interest-title">Add Your Own Category:</h4>
				<form
					onSubmit={handleAddCustomInterest}
					className="custom-interest-form"
				>
					<input
						type="text"
						value={customInterest}
						onChange={(e) => setCustomInterest(e.target.value)}
						className="custom-interest-input"
						placeholder="Enter a custom category..."
					/>
					<select
						value={customColor}
						onChange={(e) => setCustomColor(e.target.value)}
						className="custom-interest-color"
					>
						{colorOptions.map((color) => (
							<option key={color.value} value={color.value}>
								{color.label}
							</option>
						))}
					</select>
					<button
						type="submit"
						className={`custom-interest-button ${getColorClass(customColor)}`}
						disabled={customInterest.trim() === ""}
					>
						Add
					</button>
				</form>
			</div>

			<div className="saved-interests">
				<h4 className="saved-interests-title">Your Selected Interests:</h4>
				{savedInterests.length === 0 ? (
					<p className="no-interests-message">No interests selected yet</p>
				) : (
					<div className="saved-interests-container">
						{savedInterests.map((interest) => (
							<span key={interest.id} className="saved-interest-item">
								{interest.name}
								<button
									onClick={() => removeInterest(interest.id)}
									className="remove-interest-button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="remove-icon"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</span>
						))}
					</div>
				)}
			</div>

			<button
				onClick={handleGenerate}
				disabled={savedInterests.length === 0}
				className={
					savedInterests.length === 0
						? "generate-button disabled"
						: "generate-button"
				}
			>
				Generate My Feed
			</button>
		</div>
	);
};

export default UserPreferences;
