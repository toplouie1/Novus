import { useState, useEffect } from "react";
import { searchNews } from "../services/newsApi";
import { FALLBACK_IMAGE } from "../utils/constants";

const Sidebar = () => {
	const [localNews, setLocalNews] = useState([]);
	const [combatNews, setCombatNews] = useState([]);
	const [cryptoNews, setCryptoNews] = useState([]);
	const [fashionNews, setFashionNews] = useState([]);
	const [locationInfo, setLocationInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getLocationAndNews = async () => {
			try {
				const locationResponse = await fetch("https://ipapi.co/json/");
				const locationData = await locationResponse.json();
				setLocationInfo({
					city: locationData.city,
					region: locationData.region,
					country: locationData.country_name,
				});

				const localSearchQuery = `${locationData.city} ${locationData.region} news`;
				const localData = await searchNews(localSearchQuery, 1);

				const filteredNews = localData.articles.filter((article) => {
					const content = (article.title + article.description).toLowerCase();
					return (
						content.includes(locationData.city.toLowerCase()) ||
						content.includes(locationData.region.toLowerCase())
					);
				});

				setLocalNews(
					filteredNews.length > 0
						? filteredNews.slice(0, 3)
						: localData.articles.slice(0, 3)
				);

				const [combatData, cryptoData, fashionData] = await Promise.all([
					searchNews("UFC MMA boxing", 1),
					searchNews("cryptocurrency bitcoin", 1),
					searchNews("fashion style trends", 1),
				]);

				setCombatNews(combatData.articles.slice(0, 3));
				setCryptoNews(cryptoData.articles.slice(0, 3));
				setFashionNews(fashionData.articles.slice(0, 3));
			} catch (error) {
				console.error("Error fetching news:", error);
			} finally {
				setLoading(false);
			}
		};

		getLocationAndNews();
	}, []);

	const renderNewsSection = (title, news, isLocal = false) => (
		<div className="sidebar-section">
			<h3 className="sidebar-title">
				{isLocal && locationInfo
					? `${locationInfo.city}, ${locationInfo.region} News`
					: title}
			</h3>
			{loading ? (
				<div className="sidebar-loading">Loading...</div>
			) : news.length > 0 ? (
				<div className="sidebar-articles">
					{news.map((item, index) => (
						<div
							key={index}
							className="sidebar-news-item"
							onClick={() => window.open(item.url, "_blank")}
						>
							<div className="sidebar-item-image">
								<img
									src={item.urlToImage || FALLBACK_IMAGE}
									alt={item.title}
									onError={(e) => {
										if (e.target.src !== FALLBACK_IMAGE) {
											e.target.src = FALLBACK_IMAGE;
										}
									}}
								/>
							</div>
							<div className="sidebar-item-content">
								<h4 className="item-title">{item.title}</h4>
								<div className="item-meta">
									<div className="source-info">
										<img
											className="source-icon"
											src={`https://icons.duckduckgo.com/ip3/${
												new URL(item.url).hostname
											}.ico`}
											alt={item.source.name}
											loading="lazy"
											onError={(e) => (e.target.style.display = "none")}
										/>
										<span className="source-name">{item.source.name}</span>
									</div>
									<span className="item-date">{item.formattedDate}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="no-news">No news available</div>
			)}
		</div>
	);

	return (
		<aside className="sidebar">
			{renderNewsSection("Local News", localNews, true)}
			{renderNewsSection("Combat Sports", combatNews)}
			{renderNewsSection("Digital Currencies", cryptoNews)}
			{renderNewsSection("Fashion & Style", fashionNews)}
		</aside>
	);
};

export default Sidebar;
