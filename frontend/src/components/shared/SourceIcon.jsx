import { getSourceIcon } from "../../utils/helpers";

const SourceIcon = ({ url, name }) => (
	<div className="source-info">
		<img
			src={getSourceIcon(url)}
			alt={name}
			className="source-icon"
			loading="lazy"
			onError={(e) => {
				e.target.style.display = "none";
			}}
		/>
		<span className="source">{name}</span>
	</div>
);

export default SourceIcon;
