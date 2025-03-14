export const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const getSourceIcon = (url) => {
	try {
		const hostname = new URL(url).hostname;
		return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
	} catch (error) {
		return null;
	}
};

export const truncateText = (text, maxLength = 150) => {
	if (!text) return "";
	return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
