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
				let locationData = {
					city: "New York",
					region: "NY",
					country: "United States",
				};

				try {
					const response = await fetch("https://ipapi.co/json/");
					if (response.ok) {
						const data = await response.json();
						locationData = {
							city: data.city || locationData.city,
							region: data.region || locationData.region,
							country: data.country_name || locationData.country,
						};
					}
				} catch (error) {
					console.warn("IP geolocation failed, using default location:", error);
				}

				setLocationInfo(locationData);

				const localQuery = locationData.region;
				const localData = await searchNews(localQuery);

				setLocalNews(localData.articles.slice(0, 4));

				const [combatData, cryptoData, fashionData] = await Promise.all([
					searchNews("sports"),
					searchNews("crypto"),
					searchNews("fashion"),
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
				{isLocal && locationInfo && locationInfo.city
					? `${locationInfo.city}${
							locationInfo.region ? `, ${locationInfo.region}` : ""
					  } News`
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
									src={item.url_to_image || FALLBACK_IMAGE}
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
											alt={item.source_name}
											loading="lazy"
											onError={(e) => (e.target.style.display = "none")}
										/>
										<span className="source-name">{item.source_name}</span>
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
