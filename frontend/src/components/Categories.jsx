import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, onCategorySelect }) => {
	return (
		<div className="categories">
			{categories.map((category) => (
				<div
					key={category.id}
					className={`category ${
						selectedCategory === category.id ? "active" : ""
					}`}
					onClick={() => onCategorySelect(category.id)}
				>
					{category.label}
				</div>
			))}
		</div>
	);
};

export default Categories;
