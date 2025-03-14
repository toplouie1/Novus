import { FALLBACK_IMAGE } from "../utils/constants";

const FeaturedArticle = ({ article, selectedCategory }) => {
	if (!article) return null;

	return (
		<div
			className="featured-article"
			onClick={() => window.open(article.url, "_blank")}
		>
			<div className="featured-image">
				<div className="featured-tag">FEATURED</div>
				<img
					src={article.urlToImage || FALLBACK_IMAGE}
					alt={article.title}
					onError={(e) => {
						if (e.target.src !== FALLBACK_IMAGE) {
							e.target.src = FALLBACK_IMAGE;
						}
					}}
				/>
			</div>
			<div className="featured-content">
				<div className="featured-meta">
					<span className="featured-category">
						{selectedCategory.toUpperCase()}
					</span>
					<span className="featured-date">{article.formattedDate}</span>
				</div>
				<h2 className="featured-title">{article.title}</h2>
				<p className="featured-description">{article.description}</p>
				<div className="featured-footer">
					<div className="featured-source">
						<img
							src={`https://icons.duckduckgo.com/ip3/${
								new URL(article.url).hostname
							}.ico`}
							alt={article.source.name}
							className="source-icon"
							loading="lazy"
						/>
						<span>{article.source.name}</span>
					</div>
					<button className="read-more">Read Full Story →</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedArticle;
