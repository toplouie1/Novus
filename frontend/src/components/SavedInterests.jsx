import React from "react";

const SavedInterests = ({ savedInterests, removeInterest }) => {
	return (
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
	);
};

export default SavedInterests;
