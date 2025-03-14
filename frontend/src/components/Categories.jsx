const Categories = ({ categories, selectedCategory, onCategorySelect }) => {
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
					{category.name}
				</div>
			))}
		</div>
	);
};

export default Categories;
