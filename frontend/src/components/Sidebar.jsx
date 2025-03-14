import { useState, useEffect } from "react";
import { searchNews } from "../services/newsApi";

const Sidebar = () => {
	const [localNews, setLocalNews] = useState([]);
	const [combatNews, setCombatNews] = useState([]);
	const [cryptoNews, setCryptoNews] = useState([]);
	const [fashionNews, setFashionNews] = useState([]);

	useEffect(() => {
		const fetchSidebarNews = async () => {
			try {
				const localData = await searchNews("local news", 1);
				setLocalNews(localData.articles.slice(0, 3));

				const combatData = await searchNews("UFC MMA boxing", 1);
				setCombatNews(combatData.articles.slice(0, 3));

				const cryptoData = await searchNews("cryptocurrency bitcoin", 1);
				setCryptoNews(cryptoData.articles.slice(0, 3));

				const fashionData = await searchNews("fashion style trends", 1);
				setFashionNews(fashionData.articles.slice(0, 3));
			} catch (error) {
				console.error("Error fetching sidebar news:", error);
			}
		};

		fetchSidebarNews();
	}, []);

	const renderNewsSection = (title, news) => (
		<div className="sidebar-section">
			<h3 className="sidebar-title">{title}</h3>
			{news.map((item, index) => (
				<div
					key={index}
					className="sidebar-news-item"
					onClick={() => window.open(item.url, "_blank")}
				>
					<h4 className="item-title">{item.title}</h4>
					<div className="item-meta">
						<span>{item.source.name}</span>
						<span>{item.formattedDate}</span>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<aside className="sidebar">
			{renderNewsSection("Local News", localNews)}
			{renderNewsSection("Combat Sports", combatNews)}
			{renderNewsSection("Digital Currencies", cryptoNews)}
			{renderNewsSection("Fashion & Style", fashionNews)}
		</aside>
	);
};

export default Sidebar;
