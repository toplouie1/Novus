import React from "react";
import { availableInterests, getColorClass } from "../utils/preferencesUtils";

const AvailableInterests = ({ saveInterest }) => {
	return (
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
	);
};

export default AvailableInterests;
