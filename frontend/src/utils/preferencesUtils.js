export const availableInterests = [
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
];

export const colorOptions = [
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

export const getColorClass = (colorName) => {
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
