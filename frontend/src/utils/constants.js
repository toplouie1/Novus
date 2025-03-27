export const FALLBACK_IMAGE =
	"https://placehold.co/300x200/e0e0e0/ffffff?text=No+Image";

export const categories = [
	{ id: "general", label: "Home" },
	{ id: "business", label: "Business" },
	{ id: "technology", label: "Technology" },
	{ id: "Actor", label: "Actor" },
	{ id: "sports", label: "Sports" },
	{ id: "science", label: "Science" },
	{ id: "health", label: "Health" },
];

export const API_URL = import.meta.env.VITE_API_URL;

export const getUserId = () => localStorage.getItem("userId");

export const LOGO_SRC = "/novus-logo.svg";

export const SEARCH_PLACEHOLDER = "Search news...";
