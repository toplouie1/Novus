import React, { useState } from "react";
import { colorOptions, getColorClass } from "../utils/preferencesUtils";

const CustomInterestForm = ({ saveInterest }) => {
	const [customInterest, setCustomInterest] = useState("");
	const [customColor, setCustomColor] = useState("blue");

	const handleAddCustomInterest = (e) => {
		e.preventDefault();
		if (customInterest.trim() === "") return;

		const newInterest = {
			id: `custom-${Date.now()}`,
			name: customInterest.trim(),
			color: customColor,
			isCustom: true,
		};

		saveInterest(newInterest);
		setCustomInterest("");
	};

	return (
		<div className="custom-interest-container">
			<h4 className="custom-interest-title">Add Your Own Category:</h4>
			<form onSubmit={handleAddCustomInterest} className="custom-interest-form">
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
	);
};

export default CustomInterestForm;
