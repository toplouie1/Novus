import { FALLBACK_IMAGE } from "../utils/constants";
import { truncateText } from "../utils/helpers";
import SourceIcon from "./shared/SourceIcon";
import SummarizeButton from "./SummarizeButton";

const NewsCard = ({ article }) => {
	const {
		title,
		description,
		url,
		urlToImage,
		formattedDate,
		source,
		source_name,
		url_to_image,
		content,
	} = article;

	return (
		<div className="news-card">
			<div className="card-image">
				<img
					src={urlToImage || url_to_image || FALLBACK_IMAGE}
					alt={title}
					onError={(e) => {
						if (e.target.src !== FALLBACK_IMAGE) {
							e.target.src = FALLBACK_IMAGE;
						}
					}}
				/>
				<div className="image-overlay">
					<span
						className="read-indicator"
						onClick={(e) => {
							e.stopPropagation();
							window.open(url, "_blank");
						}}
					>
						Read Article
					</span>
				</div>
			</div>
			<div className="news-content">
				<div className="content-meta">
					<span className="meta-date">{formattedDate}</span>
				</div>
				<h3>{truncateText(title, 100)}</h3>
				<p>{truncateText(description, 150)}</p>
				<p>{truncateText(content, 200)}</p>
				<div className="news-footer">
					<SourceIcon url={url} name={source?.name || source_name} />
					<SummarizeButton article={article} />
				</div>
			</div>
		</div>
	);
};

export default NewsCard;
