import React, { useState, useEffect } from "react";
import "../css/UserPreferences.css";
import { updateUserCategories } from "../services/novusAi";
import AvailableInterests from "./AvailableInterests";
import CustomInterestForm from "./CustomInterestForm";
import SavedInterests from "./SavedInterests";

const UserPreferences = ({ onUpdateCategories }) => {
	const [savedInterests, setSavedInterests] = useState([]);
	const API_URL = import.meta.env.VITE_API_URL;
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const saved = localStorage.getItem("savedInterestCollection");
		if (saved) {
			setSavedInterests(JSON.parse(saved));
		}
	}, []);

	const handleUpdateUserCategories = async () => {
		try {
			await updateUserCategories(API_URL, userId, savedInterests);
			const interestNames = savedInterests.map((category) => category.name);
			onUpdateCategories(interestNames);
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

	const handleGenerate = () => {
		handleUpdateUserCategories();
	};

	return (
		<div className="interest-collector">
			<p className="instruction-text">
				Select interests to create your custom news feed:
			</p>

			<AvailableInterests saveInterest={saveInterest} />

			<CustomInterestForm saveInterest={saveInterest} />

			<SavedInterests
				savedInterests={savedInterests}
				removeInterest={removeInterest}
			/>

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
